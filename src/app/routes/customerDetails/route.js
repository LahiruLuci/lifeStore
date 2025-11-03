import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const sltbbid = searchParams.get('SLTBBID');

    if (sltbbid) {
        try {
            const db = await pool.getConnection();
            const query = "SELECT u.USERID, u.SLTBBID, u.INITIALS, u.PREFERREDNAME, u.LASTNAME, u.EMAIL, u.NIC, u.MOBILE, u.LANDPHONE, u.CREATEDDATETIME, GROUP_CONCAT(CONCAT('Subscription ID: ', s.SUBSCRIPTIONID, ', Product: ', s.PRODUCT, ', Payment Method: ', s.PAYMENTMETHOD, ', License Key: ', s.LICENSEKEY, ', Amount: ', s.AMOUNT, ', Status: ', s.STATUS, ', Created Date: ', s.CREATEDDATETIME, ', Last Updated Date: ', s.LASTUPDATEDDATETIME) SEPARATOR '; ') AS SUBSCRIPTIONS FROM systemuser u LEFT JOIN subscription s ON u.USERID = s.USER WHERE SLTBBID = ? GROUP BY u.USERID";
            const [rows] = await db.execute(query, [sltbbid]);
            db.release();
            return NextResponse.json(rows);
        } catch (error) {
            return NextResponse.json({
                error: error.message
            }, { status: 500 });
        }
    }else {
        return NextResponse.json({
            error: "SLTBBID is required"
        }, { status: 400 });
    }

}

export async function PATCH(req) {
    try {
      const { userId, email } = await req.json();
  
      const db = await pool.getConnection();
      const updateAdminQuery = "UPDATE systemuser SET EMAIL = ? WHERE USERID = ?";
      await db.execute(updateAdminQuery, [email, userId]);
  
      db.release();
      return NextResponse.json({ message: "Email updated successfully!", updatedEmail: email });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }