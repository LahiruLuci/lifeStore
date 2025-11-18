// import "server-only";
// import pool from "../config/mysql.js";
// import { getTransporter } from "./email.js";
// import { buildAdminEmailHTML } from "./adminEmailTemplate.js";
// import { getProductName } from "./productNames.js";

// const ADMIN_RECIPIENTS = ["sahanembogamafury01@gmail.com", "nikildissanayaka94@gmail.com"];

// export async function runAdminNotifierOnce() {
//   // 1) Fetch valid subscriptions that we haven't emailed yet
//   const db = await pool.getConnection();
//   let rows = [];
//   try {
//     const [result] = await db.query(`
//       SELECT 
//         ORDERID, PRODUCT, NAME, CONTACTNUMBER, EMAIL, AMOUNT, PAYHERESTATUSCODE, LICENSEKEY, CREATEDDATETIME
//       FROM subscription s
//       WHERE 
//         s.PAYHERESTATUSCODE = 2
//         AND s.LICENSEKEY IS NOT NULL
//         AND s.LICENSEKEY <> ''
//         AND NOT EXISTS (
//           SELECT 1 
//           FROM admin_mail_log aml
//           WHERE aml.ORDERID = s.ORDERID
//                 AND aml.sent_to IN (?, ?)  -- both admins must have a log
//           GROUP BY aml.ORDERID
//           HAVING COUNT(*) >= 2
//         )
//       ORDER BY s.ORDERID DESC
//       LIMIT 200
//     `, ADMIN_RECIPIENTS); // protects against spamming a huge backlog in one pass

//     rows = result;
//   } finally {
//     db.release();
//   }

//   if (!rows.length) {
//     return { checked: 0, emailed: 0 };
//   }

//   const transporter = await getTransporter();
//   let emailedCount = 0;

//   for (const r of rows) {
//     const productName = getProductName(r.PRODUCT);
//     const rawDate = r.CREATEDDATETIME ?? new Date(); // fallback: time of notification
//     const dateObj = new Date(rawDate);
//     const purchasedAtStr = new Intl.DateTimeFormat("en-LK", {
//       timeZone: "Asia/Colombo",
//       dateStyle: "medium",
//       timeStyle: "short",
//     }).format(dateObj);
//     const html = buildAdminEmailHTML({
//       name: r.NAME ?? "",
//       orderId: r.ORDERID ?? "",
//       productName,
//       amount: r.AMOUNT ?? 0,
//       phone: r.CONTACTNUMBER ?? "",
//       email: r.EMAIL ?? "",
//       purchasedAtStr,
//     });

//     // Send to both admins separately and log
//     for (const recipient of ADMIN_RECIPIENTS) {
//       try {
//         await transporter.sendMail({
//           from: process.env.EMAIL_FROM,
//           to: recipient,
//           subject: `[Kaspersky Lifestore] New Purchase – ${productName} (Order ${r.ORDERID})`,
//           html,
//         });
//         await logAdminEmail(r.ORDERID, recipient);
//         emailedCount++;
//         await new Promise(r => setTimeout(r, 1000));
//       } catch (err) {
//         // Do not throw; continue to next recipient/order.
//         console.error(`[ADMIN-NOTIFY] Failed to email ${recipient} for order ${r.ORDERID}:`, err?.message);
//       }
//     }
//   }

//   return { checked: rows.length, emailed: emailedCount };
// }

// async function logAdminEmail(orderId, recipient) {
//   const db = await pool.getConnection();
//   try {
//     await db.query(
//       `INSERT IGNORE INTO admin_mail_log (ORDERID, sent_to) VALUES (?, ?)`,
//       [orderId, recipient]
//     );
//   } finally {
//     db.release();
//   }
// }


// // src/app/lib/adminNotifier.js
// import "server-only";
// import pool from "../config/mysql.js";
// import { buildAdminEmailHTML } from "./adminEmailTemplate.js";
// import { getProductName } from "./productNames.js";

// const ADMIN_RECIPIENTS = ["sahanembogamafury01@gmail.com", "nikildissanayaka94@gmail.com"];
// const LIMIT = 200;                       // keep modest if SMTP quota is tight
// const DELAY_MS = Number(process.env.ADMIN_EMAIL_DELAY_MS ?? 5000); // 5s throttle
// const COL_TZ = "Asia/Colombo";

// function sleep(ms) {
//   return new Promise((r) => setTimeout(r, ms));
// }

// export async function runAdminNotifierOnce() {
//   const db = await pool.getConnection();
//   let rows = [];
//   try {
//     const [result] = await db.query(
//       `
//       SELECT 
//         s.ORDERID, s.PRODUCT, s.NAME, s.CONTACTNUMBER, s.EMAIL, s.AMOUNT,
//         s.PAYHERESTATUSCODE, s.LICENSEKEY, s.CREATEDDATETIME
//       FROM subscription s
//       WHERE 
//         s.PAYHERESTATUSCODE = 2
//         AND s.LICENSEKEY IS NOT NULL
//         AND s.LICENSEKEY <> ''
//         AND NOT EXISTS (
//           SELECT 1 
//           FROM admin_mail_log aml
//           WHERE aml.ORDERID = s.ORDERID
//                 AND aml.sent_to IN (?, ?)
//           GROUP BY aml.ORDERID
//           HAVING COUNT(*) >= 2
//         )
//       ORDER BY s.ORDERID DESC
//       LIMIT ?
//       `,
//       [...ADMIN_RECIPIENTS, LIMIT]
//     );
//     rows = result;
//   } finally {
//     db.release();
//   }

//   if (!rows.length) return { checked: 0, emailed: 0 };

//   // ⬇️ Lazy-load email.js only here so webpack doesn’t see nodemailer at build time
//   const { getTransporter } = await import("./email.js");
//   const transporter = await getTransporter();

//   let emailedCount = 0;

//   for (const r of rows) {
//     const productName = getProductName(r.PRODUCT);

//     // Purchase Date & Time strictly from CREATEDDATETIME (fallback now)
//     const rawDate = r.CREATEDDATETIME ?? new Date();
//     const purchasedAtStr = new Intl.DateTimeFormat("en-LK", {
//       timeZone: COL_TZ,
//       dateStyle: "medium",
//       timeStyle: "short",
//     }).format(new Date(rawDate));

//     const html = buildAdminEmailHTML({
//       name: r.NAME ?? "",
//       orderId: r.ORDERID ?? "",
//       productName,
//       amount: r.AMOUNT ?? 0,
//       phone: r.CONTACTNUMBER ?? "",
//       email: r.EMAIL ?? "",
//       purchasedAtStr,
//     });

//     for (const recipient of ADMIN_RECIPIENTS) {
//       try {
//         await transporter.sendMail({
//           from: process.env.EMAIL_FROM,
//           to: recipient,
//           subject: `[Kaspersky Lifestore] New Purchase – ${productName} (Order ${r.ORDERID})`,
//           html,
//         });
//         await logAdminEmail(r.ORDERID, recipient);
//         emailedCount++;
//         await sleep(DELAY_MS); // throttle
//       } catch (err) {
//         console.error(
//           `[ADMIN-NOTIFY] Failed to email ${recipient} for order ${r.ORDERID}:`,
//           err?.message
//         );
//         // (No logAdminEmail on failure; it’ll retry next run)
//       }
//     }
//   }

//   return { checked: rows.length, emailed: emailedCount };
// }

// async function logAdminEmail(orderId, recipient) {
//   const db = await pool.getConnection();
//   try {
//     await db.query(
//       `INSERT IGNORE INTO admin_mail_log (ORDERID, sent_to) VALUES (?, ?)`,
//       [orderId, recipient]
//     );
//   } finally {
//     db.release();
//   }
// }









// src/app/lib/adminNotifier.js
import "server-only";
import pool from "../config/mysql.js";
import { buildAdminEmailHTML } from "./adminEmailTemplate.js";
import { getProductName } from "./productNames.js";

const ADMIN_RECIPIENTS = ["sahanembogamafury01@gmail.com", "nikildissanayaka94@gmail.com", "lakwinda@slt.com.lk", "isuruhw@slt.com.lk", "diroshani@slt.com.lk", "ruchiras@slt.com.lk"];

const LIMIT = 200;
const DELAY_MS = Number(process.env.ADMIN_EMAIL_DELAY_MS ?? 5000);
const COL_TZ = "Asia/Colombo";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function runAdminNotifierOnce() {
  const db = await pool.getConnection();
  let rows = [];
  try {
    // ✅ Pick orders where fewer recipients have been logged than the number of intended admins.
    // This automatically backfills new admins for historical purchases,
    // without re-emailing admins who already got that order.
    const [result] = await db.query(
      `
      SELECT 
        s.ORDERID, s.PRODUCT, s.NAME, s.CONTACTNUMBER, s.EMAIL, s.AMOUNT,
        s.PAYHERESTATUSCODE, s.LICENSEKEY, s.CREATEDDATETIME
      FROM subscription s
      WHERE 
        s.PAYHERESTATUSCODE = 2
        AND s.LICENSEKEY IS NOT NULL
        AND s.LICENSEKEY <> ''
        AND (
          SELECT COUNT(*)
          FROM admin_mail_log aml
          WHERE aml.ORDERID = s.ORDERID
            AND aml.sent_to IN (?)
        ) < ?
      ORDER BY s.ORDERID DESC
      LIMIT ?
      `,
      [ADMIN_RECIPIENTS, ADMIN_RECIPIENTS.length, LIMIT] // ← array + length
    );
    rows = result;
  } finally {
    db.release();
  }

  if (!rows.length) return { checked: 0, emailed: 0 };

  // Lazy-load email (avoids bundling nodemailer)
  const { getTransporter } = await import("./email.js");
  const transporter = await getTransporter();

  let emailedCount = 0;

  for (const r of rows) {
    const productName = getProductName(r.PRODUCT);
    const purchasedAtStr = new Intl.DateTimeFormat("en-LK", {
      timeZone: COL_TZ,
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(r.CREATEDDATETIME ?? new Date()));

    const html = buildAdminEmailHTML({
      name: r.NAME ?? "",
      orderId: r.ORDERID ?? "",
      productName,
      amount: r.AMOUNT ?? 0,
      phone: r.CONTACTNUMBER ?? "",
      email: r.EMAIL ?? "",
      purchasedAtStr,
    });

    // ✅ Per-recipient guard: never send twice to the same admin for the same order
    const alreadySent = await getAlreadySentSet(r.ORDERID);

    for (const recipient of ADMIN_RECIPIENTS) {
      if (alreadySent.has(recipient)) continue; // skip duplicates

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: recipient,
          subject: `[Kaspersky Lifestore] New Purchase – ${productName} (Order ${r.ORDERID})`,
          html,
        });
        await logAdminEmail(r.ORDERID, recipient);
        emailedCount++;
        await sleep(DELAY_MS);
      } catch (err) {
        console.error(
          `[ADMIN-NOTIFY] Failed to email ${recipient} for order ${r.ORDERID}:`,
          err?.message
        );
        // no log on failure → it will retry next run (still won't duplicate others)
      }
    }
  }

  return { checked: rows.length, emailed: emailedCount };
}

async function getAlreadySentSet(orderId) {
  const db = await pool.getConnection();
  try {
    const [rows] = await db.query(
      "SELECT sent_to FROM admin_mail_log WHERE ORDERID = ?",
      [orderId]
    );
    return new Set(rows.map((r) => r.sent_to));
  } finally {
    db.release();
  }
}

async function logAdminEmail(orderId, recipient) {
  const db = await pool.getConnection();
  try {
    await db.query(
      `INSERT IGNORE INTO admin_mail_log (ORDERID, sent_to) VALUES (?, ?)`,
      [orderId, recipient]
    );
  } finally {
    db.release();
  }
}
