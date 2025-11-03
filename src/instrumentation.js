// // instrumentation.js (JS version)
// import "server-only";
// import cron from "node-cron";
// import { ensureTables } from "./db/ensure-tables.js";
// import { runAdminNotifierOnce } from "./lib/adminNotifier.js";

// export async function register() {
//   try {
//     await ensureTables();
//   } catch (e) {
//     console.error("[INIT] ensureTables failed:", e?.message);
//   }

//   // Allow disabling cron if needed (e.g., in dev or on a replica)
//   const enabled = process.env.ADMIN_EMAIL_CRON_ENABLED ?? "true";
//   if (enabled !== "true") {
//     console.log("[ADMIN-CRON] Disabled via ADMIN_EMAIL_CRON_ENABLED");
//     return;
//   }

//   // Fire at minute 0 of every hour (Asia/Colombo)
//   const schedule = "0 * * * *";

//   try {
//     cron.schedule(
//       schedule,
//       async () => {
//         console.log("[ADMIN-CRON] Running hourly admin notifier…");
//         try {
//           const res = await runAdminNotifierOnce();
//           console.log("[ADMIN-CRON] Completed:", res);
//         } catch (e) {
//           console.error("[ADMIN-CRON] Error:", e?.message);
//         }
//       },
//       { timezone: "Asia/Colombo" }
//     );
//     console.log(`[ADMIN-CRON] Scheduled (${schedule}) Asia/Colombo`);
//   } catch (e) {
//     console.error("[ADMIN-CRON] Failed to schedule cron:", e?.message);
//   }
// }


// import "server-only";
// import cron from "node-cron";
// import { ensureTables } from "./db/ensure-tables.js";
// import { runAdminNotifierOnce } from "./lib/adminNotifier.js";

// export async function register() {
//   // Skip during build
//   if (process.env.NEXT_PHASE === 'phase-production-build') {
//     console.log("[ADMIN-CRON] Skipping during build phase");
//     return;
//   }

//   try { await ensureTables(); } catch (e) {
//     console.error("[INIT] ensureTables failed:", e?.message);
//   }

//   const enabled = process.env.ADMIN_EMAIL_CRON_ENABLED ?? "true";
//   if (enabled !== "true") {
//     console.log("[ADMIN-CRON] Disabled via ADMIN_EMAIL_CRON_ENABLED");
//     return;
//   }

//   const schedule = "0 * * * *";
//   try {
//     cron.schedule(schedule, async () => {
//       console.log("[ADMIN-CRON] Running hourly admin notifier…");
//       try {
//         const res = await runAdminNotifierOnce();
//         console.log("[ADMIN-CRON] Completed:", res);
//       } catch (e) {
//         console.error("[ADMIN-CRON] Error:", e?.message);
//       }
//     }, { timezone: "Asia/Colombo" });
//     console.log(`[ADMIN-CRON] Scheduled (${schedule}) Asia/Colombo`);
//   } catch (e) {
//     console.error("[ADMIN-CRON] Failed to schedule cron:", e?.message);
//   }
// }







// src/instrumentation.js
import "server-only";
import { ensureTables } from "./db/ensure-tables.js";
import { runAdminNotifierOnce } from "./lib/adminNotifier.js";

export async function register() {
  // Skip during build
  if (process.env.NEXT_PHASE === "phase-production-build") {
    console.log("[ADMIN-CRON] Skipping during build phase");
    return;
  }

  // Prevent double-start on hot reloads
  if (globalThis.__ADMIN_CRON_STARTED) {
    console.log("[ADMIN-CRON] Already started, skipping");
    return;
  }
  globalThis.__ADMIN_CRON_STARTED = true;

  try {
    await ensureTables();
    console.log("[ADMIN-CRON] ensureTables OK");
  } catch (e) {
    console.error("[ADMIN-CRON] ensureTables failed:", e?.message);
  }

  const enabled = process.env.ADMIN_EMAIL_CRON_ENABLED ?? "true";
  if (enabled !== "true") {
    console.log("[ADMIN-CRON] Disabled via ADMIN_EMAIL_CRON_ENABLED");
    return;
  }

  const TZ = "Asia/Colombo";

  // Helper to compute ms until the top of the next hour in Asia/Colombo
  function msUntilNextHour() {
    const now = new Date();
    const lkNow = new Date(now.toLocaleString("en-US", { timeZone: TZ }));
    const next = new Date(lkNow);
    next.setMinutes(60, 0, 0); // next top of hour
    return next.getTime() - lkNow.getTime();
  }

  async function runOnce() {
    console.log("[ADMIN-CRON] TICK: starting runAdminNotifierOnce()");
    try {
      const res = await runAdminNotifierOnce();
      console.log("[ADMIN-CRON] Completed:", res);
    } catch (e) {
      console.error("[ADMIN-CRON] Error:", e?.message);
    }
  }

  // Kick strategy:
  //  - Wait until the *next* top of hour in Colombo, then run.
  //  - After that, run every 60 minutes.
  const firstDelay = msUntilNextHour();
  console.log(`[ADMIN-CRON] Scheduled top-of-hour (Asia/Colombo) in ~${Math.ceil(firstDelay/1000)}s`);

  setTimeout(() => {
    runOnce();
    setInterval(runOnce, 60 * 60 * 1000); // hourly
  }, firstDelay);

  // Optional: enable a fast loop for debugging (every minute)
  if (process.env.ADMIN_EMAIL_DEBUG_EVERY_MINUTE === "true") {
    console.log("[ADMIN-CRON] DEBUG MODE: also running every minute");
    setInterval(runOnce, 60 * 1000);
  }
}

