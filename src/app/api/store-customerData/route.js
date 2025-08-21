// import pool from "../../config/mysql";

// export async function POST(request) {
//   try {
//     const data = await request.json();
    
//     const db = await pool.getConnection();
//     const query = `INSERT INTO subscription 
//       (ORDERID, PRODUCT, NAME, CONTACTNUMBER, EMAIL) 
//       VALUES (?, ?, ?, ?, ?)`;

//     const values = [
//       data.order_id,
//       data.pCode,
//       data.fullName,
//       data.phone,
//       data.email
//     ];

//     await db.query(query, values);
//     db.release();

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (error) {
//     console.error("Error storing order:", error);
//     return new Response(JSON.stringify({ success: false }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }

// import pool from "../../config/mysql";

// export async function POST(request) {
//   try {
//     const data = await request.json();
    
//     const db = await pool.getConnection();
//     const query = `INSERT INTO subscription 
//       (ORDERID, PRODUCT, NAME, CONTACTNUMBER, EMAIL) 
//       VALUES (?, ?, ?, ?, ?)`;

//     const values = [
//       data.order_id,
//       data.pCode,
//       data.fullName,
//       data.phone,
//       data.email
//     ];

//     await db.query(query, values);
//     db.release();

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (error) {
//     console.error("Error storing order:", error);
//     return new Response(JSON.stringify({ success: false }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }

// Make this route dynamic at runtime (not prerendered)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import pool from "../../config/mysql";

export async function POST(request) {
  try {
    // 1) Parse body (support JSON and x-www-form-urlencoded)
    const ct = (request.headers.get('content-type') || '').toLowerCase();
    let payload = {};
    if (ct.includes('application/json')) {
      payload = await request.json();
    } else if (ct.includes('application/x-www-form-urlencoded')) {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    } else {
      // Fallback: try query string (in case someone GETs it)
      const sp = request?.nextUrl?.searchParams ?? new URL(request.url).searchParams;
      payload = Object.fromEntries(sp.entries());
    }

    // 2) Normalize field names from various sources
    const orderId = payload.order_id ?? payload.orderId ?? payload.ORDERID;
    const product = payload.pCode ?? payload.product ?? payload.PRODUCT;
    const fullName = payload.fullName ?? payload.name ?? payload.customer_name ?? payload.NAME;
    const phone    = payload.phone ?? payload.customer_phone ?? payload.CONTACTNUMBER;
    const email    = payload.email ?? payload.customer_email ?? payload.EMAIL;

    // 3) Validate required fields
    const missing = [];
    if (!orderId) missing.push('order_id');
    if (!product) missing.push('product/pCode');
    if (!fullName) missing.push('fullName');
    if (!phone) missing.push('phone');
    if (!email) missing.push('email');

    if (missing.length) {
      return new Response(JSON.stringify({
        success: false,
        error: `Missing required fields: ${missing.join(', ')}`
      }), { status: 400, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }});
    }

    // 4) Insert
    const db = await pool.getConnection();
    try {
      await db.query(
        `INSERT INTO subscription (ORDERID, PRODUCT, NAME, CONTACTNUMBER, EMAIL)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, product, fullName, phone, email]
      );
    } catch (e) {
      // Handle duplicate ORDERID
      if (e && (e.code === 'ER_DUP_ENTRY' || e.errno === 1062)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Order already stored (duplicate ORDERID)'
        }), { status: 409, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }});
      }
      console.error('DB insert error:', e);
      throw e;
    } finally {
      db.release();
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });

  } catch (error) {
    console.error("Error storing order:", error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
}
