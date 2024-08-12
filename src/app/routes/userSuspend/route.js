import { NextResponse } from "next/server";
import pool from "../../config/mysql";


export async function PATCH(req) {

  const { adminId, subscriptionId, status } = await req.json();
  let updateSubscriptionQuery;
  let description;

  try {
    const db = await pool.getConnection();
    if (adminId && status && subscriptionId) {
      if (status === "suspend") {
        updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
        await db.execute(updateSubscriptionQuery, ['2', adminId, subscriptionId]);
        description = "suspended";
      } else if (status === "reactive") {
        updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
        await db.execute(updateSubscriptionQuery, ['3', adminId, subscriptionId]);
        description = "reactivated";
      }  else {
        return NextResponse.json({ error: "Invalid status provided" }, { status: 400 });
      }

      db.release();
      return NextResponse.json({ message: "success!", subscriptionId, description });
    } else {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}