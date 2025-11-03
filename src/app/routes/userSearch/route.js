import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const sltbbid = searchParams.get('SLTBBID');
    const email = searchParams.get('EMAIL');
    if (sltbbid) {
        try {
            const db = await pool.getConnection();
            const query = "SELECT * FROM systemuser  WHERE userrole=1 AND SLTBBID = ?";
            const [rows] = await db.execute(query, [sltbbid]);
            db.release();
            return NextResponse.json(rows);
        } catch (error) {
            return NextResponse.json({
                error: error.message
            }, { status: 500 });
        }
    } else if (email) {
        try {
            const db = await pool.getConnection();
            const query = "SELECT * FROM systemuser  WHERE userrole=1 AND EMAIL = ?";
            const [rows] = await db.execute(query, [email]);
            db.release();
            return NextResponse.json(rows);
        } catch (error) {
            return NextResponse.json({
                error: error.message
            }, { status: 500 });
        }
    } else {
        return NextResponse.json({
            error: "Either SLTBBID or EMAIL is required"
        }, { status: 400 });
    }
}