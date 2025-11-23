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


import "server-only";
import cron from "node-cron";
import { ensureTables } from "./app/db/ensure-tables.js";
import { runAdminNotifierOnce } from "./app/lib/adminNotifier.js";
import { runAdminWarnNotifierOnce } from "./app/lib/adminWarnNotifier.js"; // New

export async function register() {
  // Skip during build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    console.log("[ADMIN-CRON] Skipping during build phase");
    return;
  }

  try { await ensureTables(); } catch (e) {
    console.error("[INIT] ensureTables failed:", e?.message);
  }

  const enabled = process.env.ADMIN_EMAIL_CRON_ENABLED ?? "true";
  if (enabled !== "true") {
    console.log("[ADMIN-CRON] Disabled via ADMIN_EMAIL_CRON_ENABLED");
    return;
  }

  // -------------------- Existing notify cron (hourly) --------------------
  const notifySchedule = "0 * * * *";
  try {
    cron.schedule(notifySchedule, async () => {
      console.log("[ADMIN-NOTIFY-CRON] Running hourly admin notifier…");
      try {
        const res = await runAdminNotifierOnce();
        console.log("[ADMIN-NOTIFY-CRON] Completed:", res);
      } catch (e) {
        console.error("[ADMIN-NOTIFY-CRON] Error:", e?.message);
      }
    }, { timezone: "Asia/Colombo" });
    console.log(`[ADMIN-NOTIFY-CRON] Scheduled (${notifySchedule}) Asia/Colombo`);
  } catch (e) {
    console.error("[ADMIN-NOTIFY-CRON] Failed to schedule cron:", e?.message);
  }

  // -------------------- NEW warn cron (every 30 minutes) --------------------
  const warnSchedule = "*/30 * * * *"; // minute 0 and 30
  try {
    cron.schedule(
      warnSchedule,
      async () => {
        console.log("[ADMIN-WARN-CRON] Running 30-min admin warn notifier…");
        try {
          const res = await runAdminWarnNotifierOnce();
          console.log("[ADMIN-WARN-CRON] Completed:", res);
        } catch (e) {
          console.error("[ADMIN-WARN-CRON] Error:", e?.message);
        }
      },
      { timezone: "Asia/Colombo" }
    );
    console.log(`[ADMIN-WARN-CRON] Scheduled (${warnSchedule}) Asia/Colombo`);
  } catch (e) {
    console.error("[ADMIN-WARN-CRON] Failed to schedule cron:", e?.message);
  }
}
