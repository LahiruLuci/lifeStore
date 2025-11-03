import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get('USERID');
    if (userid) {
        try {
            const db = await pool.getConnection();
            const query = "SELECT USERID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE USERID = ?";
            const [rows] = await db.execute(query, [userid]);
            db.release();
            return NextResponse.json(rows)
        } catch (error) {
            return NextResponse.json({
                error: error.message
            }, { status: 400 })
        }
    } else {
        return NextResponse.json({
            error: "Incorrect credintials"
        }, { status: 400 });
    }

}

export async function PATCH(req) {
    try {
      const { adminId, password } = await req.json();
  
      const db = await pool.getConnection();
      const updateAdminQuery = "UPDATE systemuser SET PASSWORD = ?, LASTUPDATEDUSER = ? WHERE USERID = ?";
      await db.execute(updateAdminQuery, [password, adminId, adminId]);
  
  
      db.release();
      return NextResponse.json({ message: "Admin Password updated successfully!", adminId });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }