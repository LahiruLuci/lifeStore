export const dynamic = "force-dynamic";

import pool from "../../../../config/mysql";
import { getProductName } from "../../../../lib/productNames";

function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/"/g, '""');
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const month = url.searchParams.get("month");
    const year = url.searchParams.get("year");
    const product = url.searchParams.get("product");

    let sql = `
      SELECT 
        ORDERID,
        PAYMENTID,
        PRODUCT,
        PAYHERESTATUSCODE,
        LICENSEKEY,
        AMOUNT,
        NAME,
        CONTACTNUMBER,
        EMAIL,
        CREATEDDATETIME
      FROM subscription
      WHERE PAYHERESTATUSCODE = 2
        AND LICENSEKEY IS NOT NULL
        AND LICENSEKEY <> ''
    `;

    const params = [];

    if (year) {
      sql += " AND YEAR(CREATEDDATETIME) = ?";
      params.push(Number(year));
    }

    if (month) {
      sql += " AND MONTH(CREATEDDATETIME) = ?";
      params.push(Number(month));
    }

    if (product) {
      sql += " AND PRODUCT = ?";
      params.push(product);
    }

    sql += " ORDER BY CREATEDDATETIME DESC";

    const [rows] = await pool.query(sql, params);

    const header = [
      "ORDERID",
      "PAYMENTID",
      "PRODUCT_CODE",
      "PRODUCT_NAME",
      "PAYHERESTATUSCODE",
      "LICENSEKEY",
      "AMOUNT",
      "NAME",
      "CONTACTNUMBER",
      "EMAIL",
      "CREATEDDATETIME",
    ];

    const lines = [
      header.map((h) => `"${esc(h)}"`).join(","), // header row
      ...rows.map((row) => {
        const cols = [
          row.ORDERID,
          row.PAYMENTID,
          row.PRODUCT,
          getProductName(row.PRODUCT),
          row.PAYHERESTATUSCODE,
          row.LICENSEKEY,
          row.AMOUNT,
          row.NAME,
          row.CONTACTNUMBER,
          row.EMAIL,
          row.CREATEDDATETIME,
        ];
        return cols.map((c) => `"${esc(c)}"`).join(",");
      }),
    ];

    const csv = lines.join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=\"subscriptions_report.csv\"",
      },
    });
  } catch (err) {
    console.error("Error generating CSV:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
