import { NextResponse } from "next/server";
import pool from "../../config/mysql";

let description;

export async function PATCH(req) {

  const { user, adminId, subscriptionId, licensekey, statusId } = await req.json();

  try {
    const db = await pool.getConnection();
    if (!adminId === '' || !adminId === null) {
      const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
      await db.execute(updateSubscriptionQuery, [parseInt(statusId), adminId, subscriptionId]);
      if (statusId === 1) {
        description = "reactive";
      } else if (statusId === 2) {
        description = "suspended";
      }
    } else {
      const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
      await db.execute(updateSubscriptionQuery, [parseInt(statusId), user, subscriptionId]);
      if (statusId === 1) {
        description = "reactive";
      } else if (statusId === 2) {
        description = "suspended";
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