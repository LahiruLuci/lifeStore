// src/app/lib/adminWarnNotifier.js
import "server-only";
import pool from "../config/mysql.js";
import { buildAdminWarnEmailHTML } from "./adminWarnEmailTemplate.js";
import { getProductName } from "./productNames.js";

const ADMIN_WARN_RECIPIENTS = [
  "sahanembogama2003@gmail.com",
  "ruchiras@slt.com.lk",
];

const LIMIT = 200;
const DELAY_MS = Number(process.env.ADMIN_EMAIL_DELAY_MS ?? 5000);
const COL_TZ = "Asia/Colombo";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function runAdminWarnNotifierOnce() {
  const warnDate = getColomboTodayDate();

  const db = await pool.getConnection();
  let rows = [];
  try {
    /**
     * ✅ Requirements:
     *  - PAYHERESTATUSCODE = 2
     *  - LICENSEKEY IS NULL or ''
     *  - only TODAY (Colombo) purchases
     *  - and warn not yet sent TODAY to all intended recipients
     */
    const [result] = await db.query(
      `
      SELECT
        s.ORDERID, s.PRODUCT, s.NAME, s.CONTACTNUMBER, s.EMAIL, s.AMOUNT,
        s.PAYHERESTATUSCODE, s.LICENSEKEY, s.CREATEDDATETIME
      FROM subscription s
      WHERE
        s.PAYHERESTATUSCODE = 2
        AND (s.LICENSEKEY IS NULL OR s.LICENSEKEY = '')
        AND DATE(CONVERT_TZ(s.CREATEDDATETIME, @@session.time_zone, '+05:30')) = ?
        AND (
          SELECT COUNT(*)
          FROM admin_warn_mail_log awl
          WHERE awl.ORDERID = s.ORDERID
            AND awl.warn_date = ?
            AND awl.sent_to IN (?)
        ) < ?
      ORDER BY s.CREATEDDATETIME DESC
      LIMIT ?
      `,
      [warnDate, warnDate, ADMIN_WARN_RECIPIENTS, ADMIN_WARN_RECIPIENTS.length, LIMIT]
    );

    rows = result;
  } finally {
    db.release();
  }

  if (!rows.length) return { checked: 0, emailed: 0, warnDate };

  // nodemailer lazy-load (same as notify) :contentReference[oaicite:6]{index=6}
  const { getTransporter } = await import("./email.js");
  const transporter = await getTransporter();

  let emailedCount = 0;

  for (const r of rows) {
    const productName = getProductName(r.PRODUCT); // :contentReference[oaicite:7]{index=7}

    const purchasedAtStr = new Intl.DateTimeFormat("en-LK", {
      timeZone: COL_TZ,
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(r.CREATEDDATETIME ?? new Date()));

    const html = buildAdminWarnEmailHTML({
      name: r.NAME ?? "",
      orderId: r.ORDERID ?? "",
      productName,
      amount: r.AMOUNT ?? 0,
      phone: r.CONTACTNUMBER ?? "",
      email: r.EMAIL ?? "",
      purchasedAtStr,
    });

    const alreadySent = await getAlreadySentSet(r.ORDERID, warnDate);

    for (const recipient of ADMIN_WARN_RECIPIENTS) {
      if (alreadySent.has(recipient)) continue;

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: recipient,
          subject: `[Kaspersky Lifestore] ACTION REQUIRED – License Key Missing (${productName}) | Order ${r.ORDERID}`,
          html,
        });

        await logAdminWarnEmail(r.ORDERID, recipient, warnDate);
        emailedCount++;
        await sleep(DELAY_MS);
      } catch (err) {
        console.error(
          `[ADMIN-WARN] Failed to email ${recipient} for order ${r.ORDERID}:`,
          err?.message
        );
      }
    }
  }

  return { checked: rows.length, emailed: emailedCount, warnDate };
}

// ---------- helpers ----------

function getColomboTodayDate() {
  // Colombo-local YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: COL_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function getAlreadySentSet(orderId, warnDate) {
  const db = await pool.getConnection();
  try {
    const [rows] = await db.query(
      `
      SELECT sent_to
      FROM admin_warn_mail_log
      WHERE ORDERID = ? AND warn_date = ?
      `,
      [orderId, warnDate]
    );
    return new Set(rows.map((r) => r.sent_to));
  } finally {
    db.release();
  }
}

async function logAdminWarnEmail(orderId, recipient, warnDate) {
  const db = await pool.getConnection();
  try {
    await db.query(
      `
      INSERT IGNORE INTO admin_warn_mail_log (ORDERID, sent_to, warn_date)
      VALUES (?, ?, ?)
      `,
      [orderId, recipient, warnDate]
    );
  } finally {
    db.release();
  }
}
