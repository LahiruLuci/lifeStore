import { NextResponse } from "next/server";
import pool from "../../config/mysql";

let description;
let statusId;

export async function PATCH(req) {

  const { adminId, subscriptionId, status } = await req.json();

  try {
    const db = await pool.getConnection();
    if (!adminId === '' || !adminId === null) {
      if (status === "suspended") {
        statusId = 2;
        const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
        await db.execute(updateSubscriptionQuery, [parseInt(statusId), adminId, subscriptionId]);
        description = "suspended";
      } else if (status === "reactive") {
        statusId = 1;
        const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
        await db.execute(updateSubscriptionQuery, [parseInt(statusId), adminId, subscriptionId]);
        description = "reactive";
      } 
    }

    db.release();
    return NextResponse.json({ message: "success!", subscriptionId, description });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}