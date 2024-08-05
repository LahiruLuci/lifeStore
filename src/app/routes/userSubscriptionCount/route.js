import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function POST(req) {
  try {
    const { user, productName } = await req.json();

    const db = await pool.getConnection();
    try {
      const selectProductQuery = "SELECT * FROM product WHERE PRODUCTNAME = ?";

      const [productResult] = await db.execute(selectProductQuery, [productName]);

      if (productResult.length === 0) {
        db.release();
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }

      let productId = productResult[0].PRODUCTID;

      const selectSubscriptionsCountQuery = `SELECT COUNT(*) AS SUBSCRIPTIONCOUNT FROM subscription s LEFT JOIN product p ON s.PRODUCT = p.PRODUCTID LEFT JOIN status st ON st.STATUSID = s.STATUS WHERE s.USER = ? AND s.PRODUCT = ?`;

      const [countResult] = await db.execute(selectSubscriptionsCountQuery, [user, productId]);

      db.release();

      if (countResult.length > 0) {
        let subscriptionsCount = countResult[0].SUBSCRIPTIONCOUNT;
        return NextResponse.json({ message: "Product Count!", subscriptionsCount });
      }
      
      return NextResponse.json({ message: "Product Count!" });

    } catch (queryError) {
      console.error('Error executing query:', queryError);
      db.release();
      return NextResponse.json({ error: queryError.message }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}
