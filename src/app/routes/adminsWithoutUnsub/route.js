import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM `systemuser` WHERE `USERROLE` = 4";
    const [rows] = await db.execute(query);
    db.release();
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { userId, admin_withoutUnsub_Id, password, initials, preferredName, lastName, email, nic, mobile } = await req.json();

    const db = await pool.getConnection();
    const insertAdminQuery = "INSERT INTO systemuser (USERID, PASSWORD, INITIALS, PREFERREDNAME, LASTNAME, EMAIL, NIC, MOBILE, USERROLE, STATUS, CREATEDUSER, LASTUPDATEDUSER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.execute(insertAdminQuery, [userId, password, initials, preferredName, lastName, email, nic, mobile, '4', '1', admin_withoutUnsub_Id, admin_withoutUnsub_Id]);

    db.release();
    return NextResponse.json({ message: "Admin added successfully!", userId });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { userId, admin_withoutUnsub_Id, mobile, password } = await req.json();

    const db = await pool.getConnection();
    const updateAdminQuery = "UPDATE systemuser SET MOBILE = ?, PASSWORD = ?, LASTUPDATEDUSER = ? WHERE USERID = ?";
    await db.execute(updateAdminQuery, [mobile, password, admin_withoutUnsub_Id, userId]);


    db.release();
    return NextResponse.json({ message: "Admin Details updated successfully!", userId });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { userId } = await req.json();

    const db = await pool.getConnection();

    const deleteAdminQuery = "DELETE FROM systemuser WHERE USERID = ?";
    await db.execute(deleteAdminQuery, [userId]);

    db.release();
    return NextResponse.json({ message: "Admin deleted successfully!" });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}