import pool from "../../config/mysql";

export async function POST(request) {
  try {
    const data = await request.json();
    
    const db = await pool.getConnection();
    const query = `INSERT INTO subscription 
      (ORDERID, PRODUCT, NAME, CONTACTNUMBER, EMAIL) 
      VALUES (?, ?, ?, ?, ?)`;

    const values = [
      data.order_id,
      data.pCode,
      data.fullName,
      data.phone,
      data.email
    ];

    await db.query(query, values);
    db.release();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error storing order:", error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}