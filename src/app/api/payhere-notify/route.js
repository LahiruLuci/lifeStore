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

    const db = await pool.getConnection();
    let query = `UPDATE payments SET status = ? WHERE order_id = ?`;

    return new Response("Received", { status: 200 });
  } catch (error) {
    console.error("Error handling PayHere notify_url:", error);
    return new Response("Error", { status: 500 });
  }
}
