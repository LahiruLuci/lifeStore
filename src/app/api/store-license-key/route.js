export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;



import pool from "../../config/mysql";

export async function POST(request) {
  try {
    const data = await request.json();
    const { orderId, licenseKey } = data;

    if (!orderId || !licenseKey) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Order ID and License Key are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await pool.getConnection();
    await db.query("SET time_zone = '+05:30'");

    
    // Update the subscription record with the license key
    const query = `UPDATE subscription SET LICENSEKEY = ? WHERE ORDERID = ?`;
    const values = [licenseKey, orderId];

    const [result] = await db.query(query, values);
    db.release();

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Order not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'License key stored successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error storing license key:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}