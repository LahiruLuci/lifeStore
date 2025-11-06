// import pool from "../../config/mysql";

// export async function POST(request) {
//   try {
//     const form = await request.formData();
//     const paymentData = {};

//     for (const [key, value] of form.entries()) {
//       paymentData[key] = value;
//     }

//     // You can log it (for now) or store in DB
//     console.log("PayHere Notification Received:", paymentData);

//     const currentDataTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

//     const db = await pool.getConnection();
//     let query = `UPDATE subscription SET PAYMENTID = ?, AMOUNT = ?, PAYHERESTATUSCODE = ?, CREATEDDATETIME = ? WHERE ORDERID = ?`;

//     const values = [
//       paymentData.payment_id,
//       paymentData.payhere_amount,
//       paymentData.status_code,
//       currentDataTime,
//       paymentData.order_id,
//     ];

//     await db.query(query, values);
//     db.release();

//     return new Response("Received", { status: 200 });
//   } catch (error) {
//     console.error("Error handling PayHere notify_url:", error);
//     return new Response("Error", { status: 500 });
//   }
// }

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


import pool from "../../config/mysql";

export async function POST(request) {
  try {
    const form = await request.formData();
    const paymentData = {};

    for (const [key, value] of form.entries()) {
      paymentData[key] = value;
    }

    // You can log it (for now) or store in DB
    console.log("PayHere Notification Received:", paymentData);

    const currentDataTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const db = await pool.getConnection();
    await db.query("SET time_zone = '+05:30'");

    let query = `UPDATE subscription SET PAYMENTID = ?, AMOUNT = ?, PAYHERESTATUSCODE = ?, CREATEDDATETIME = ? WHERE ORDERID = ?`;

    const values = [
      paymentData.payment_id,
      paymentData.payhere_amount,
      paymentData.status_code,
      currentDataTime,
      paymentData.order_id,
    ];

    await db.query(query, values);
    db.release();

    return new Response("Received", { status: 200 });
  } catch (error) {
    console.error("Error handling PayHere notify_url:", error);
    return new Response("Error", { status: 500 });
  }
}
