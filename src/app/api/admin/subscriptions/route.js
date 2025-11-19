import pool from "../../../config/mysql";
import { getProductName } from "../../../lib/productNames";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const month = url.searchParams.get("month"); // "1".."12" or null
    const year = url.searchParams.get("year");   // "2025" etc. or null
    const product = url.searchParams.get("product"); // product code or null

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

    const enriched = rows.map((row) => ({
      ...row,
      productName: getProductName(row.PRODUCT),
    }));

    return new Response(
      JSON.stringify({
        totalCount: enriched.length,
        subscriptions: enriched,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Error fetching admin subscriptions:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
