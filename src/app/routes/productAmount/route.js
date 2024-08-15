import { NextResponse } from "next/server";
import pool from "../../config/mysql";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productCode = searchParams.get('productCode');

  try {
    const db = await pool.getConnection();
    if (productCode) {
      const query = "SELECT p.PRODUCTID, p.PRODUCTCODE, ppm.AMOUNT FROM product p LEFT JOIN productpaymentmethod ppm ON p.PRODUCTID = ppm.PRODUCT WHERE p.PRODUCTCODE = ?";
      const [productResult] = await db.execute(query, [productCode]);
      if (productResult.length === 0) {
        db.release();
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
      let amount = productResult[0].AMOUNT;
      return NextResponse.json({ message: "success!", amount });

    } else {
      return NextResponse.json({ error: "Invalid input data" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}