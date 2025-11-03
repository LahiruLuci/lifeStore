import pool from "../config/mysql.js";
import { getTransporter } from "./email.js";
import { buildAdminEmailHTML } from "./adminEmailTemplate.js";
import { getProductName } from "./productNames.js";

const ADMIN_RECIPIENTS = ["sahanembogamafury01@gmail.com", "nikildissanayaka94@gmail.com"];

export async function runAdminNotifierOnce() {
  // 1) Fetch valid subscriptions that we haven't emailed yet
  const db = await pool.getConnection();
  let rows = [];
  try {
    const [result] = await db.query(`
      SELECT 
        ORDERID, PRODUCT, NAME, CONTACTNUMBER, EMAIL, AMOUNT, PAYHERESTATUSCODE, LICENSEKEY, CREATEDDATETIME
      FROM subscription s
      WHERE 
        s.PAYHERESTATUSCODE = 2
        AND s.LICENSEKEY IS NOT NULL
        AND s.LICENSEKEY <> ''
        AND NOT EXISTS (
          SELECT 1 
          FROM admin_mail_log aml
          WHERE aml.ORDERID = s.ORDERID
                AND aml.sent_to IN (?, ?)  -- both admins must have a log
          GROUP BY aml.ORDERID
          HAVING COUNT(*) >= 2
        )
      ORDER BY s.ORDERID DESC
      LIMIT 200
    `, ADMIN_RECIPIENTS); // protects against spamming a huge backlog in one pass

    rows = result;
  } finally {
    db.release();
  }

  if (!rows.length) {
    return { checked: 0, emailed: 0 };
  }

  const transporter = await getTransporter();
  let emailedCount = 0;

  for (const r of rows) {
    const productName = getProductName(r.PRODUCT);
    const rawDate = r.CREATEDDATETIME ?? new Date(); // fallback: time of notification
    const dateObj = new Date(rawDate);
    const purchasedAtStr = new Intl.DateTimeFormat("en-LK", {
      timeZone: "Asia/Colombo",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(dateObj);
    const html = buildAdminEmailHTML({
      name: r.NAME ?? "",
      orderId: r.ORDERID ?? "",
      productName,
      amount: r.AMOUNT ?? 0,
      phone: r.CONTACTNUMBER ?? "",
      email: r.EMAIL ?? "",
      purchasedAtStr,
    });

    // Send to both admins separately and log
    for (const recipient of ADMIN_RECIPIENTS) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: recipient,
          subject: `[Kaspersky Lifestore] New Purchase – ${productName} (Order ${r.ORDERID})`,
          html,
        });
        await logAdminEmail(r.ORDERID, recipient);
        emailedCount++;
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        // Do not throw; continue to next recipient/order.
        console.error(`[ADMIN-NOTIFY] Failed to email ${recipient} for order ${r.ORDERID}:`, err?.message);
      }
    }
  }

  return { checked: rows.length, emailed: emailedCount };
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
