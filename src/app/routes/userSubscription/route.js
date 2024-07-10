import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('USER');

    if (userId) {
        try {
            const db = await pool.getConnection();
            const query = "SELECT p.PRODUCTNAME, s.SUBSCRIPTIONID, s.PRODUCT, s.LICENSEKEY, s.AMOUNT, s.CREATEDDATETIME, st.DESCRIPTION AS STATUSDESCRIPTION FROM subscription s LEFT JOIN product p ON s.PRODUCT = p.PRODUCTID LEFT JOIN STATUS st ON st.STATUSID = s.STATUS WHERE USER = ? GROUP BY s.SUBSCRIPTIONID";
            const [rows] = await db.execute(query, [userId]);
            db.release();
            return NextResponse.json(rows);
        } catch (error) {
            return NextResponse.json({
                error: error.message
            }, { status: 500 });
        }
    } else {
        return NextResponse.json({
            error: "USER ID is required"
        }, { status: 400 });
    }
    
}