import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('EMAIL');
    const sltbbid = searchParams.get('SLTBBID');
    if (sltbbid && email) {
        try {
            const db = await pool.getConnection();
            let query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE SLTBBID = ?";
            let [rows] = await db.execute(query, [sltbbid]);
            if (rows.length === 0) {
                query = "INSERT INTO `systemuser` (USERID,SLTBBID,EMAIL) VALUES (?,?,?);";
                await db.execute(query, [sltbbid,sltbbid,email]);

                query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE SLTBBID = ? AND EMAIL = ?";
                [rows] = await db.execute(query, [sltbbid,email]);
            }
            db.release();
            return NextResponse.json(rows)
        } catch (error) {
            return NextResponse.json({
                error: error
            }, { status: 500 })
        }
    } else if (sltbbid) {
        try {
            const db = await pool.getConnection();
            let query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE SLTBBID = ?";
            let [rows] = await db.execute(query, [sltbbid]);
            if (rows.length === 0) {
                query = "INSERT INTO `systemuser` (USERID,SLTBBID) VALUES (?,?);";
                await db.execute(query, [sltbbid,sltbbid]);

                query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE SLTBBID = ?";
                [rows] = await db.execute(query, [sltbbid]);
            }
            db.release();
            return NextResponse.json(rows)
        } catch (error) {
            return NextResponse.json({
                error: error
            }, { status: 500 })
        }
    } else if (email) {
        try {
            const db = await pool.getConnection();
            const query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE EMAIL = ?";
            const [rows] = await db.execute(query, [email]);
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