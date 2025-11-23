import "server-only";

import pool from "../config/mysql.js";

export async function ensureTables() {
  const db = await pool.getConnection();
  try {
    // Log each admin email we send (one row per ORDERID)
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_mail_log (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ORDERID VARCHAR(64) NOT NULL,
        sent_to VARCHAR(255) NOT NULL,
        sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uniq_orderid_recipient (ORDERID, sent_to)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // New: warn log (date-scoped)
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_warn_mail_log (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ORDERID VARCHAR(64) NOT NULL,
        sent_to VARCHAR(255) NOT NULL,
        warn_date DATE NOT NULL, -- Colombo-local date
        sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uniq_orderid_recipient_date (ORDERID, sent_to, warn_date),
        KEY idx_warn_date (warn_date),
        KEY idx_orderid (ORDERID)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } finally {
    db.release();
  }
}
