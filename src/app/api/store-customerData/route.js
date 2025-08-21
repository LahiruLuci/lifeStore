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


import pool from "../../config/mysql";

export async function POST(request) {
  try {
    const data = await request.json();

    const db = await pool.getConnection();

    const query = `
      INSERT INTO subscription 
        (ORDERID, PRODUCT, NAME, CONTACTNUMBER, EMAIL, PAYMENTID, PAYHERESTATUSCODE, LICENSEKEY, AMOUNT) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.order_id,             // ORDERID
      data.pCode,                // PRODUCT
      data.fullName,             // NAME
      data.phone,                // CONTACTNUMBER
      data.email,                // EMAIL
      "0",                       // PAYMENTID (default until updated)
      0,                         // PAYHERESTATUSCODE (0 = pending)
      "",                        // LICENSEKEY (empty until generated)
      data.amount || 0.00        // AMOUNT
    ];

    await db.query(query, values);
    db.release();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error storing order:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}