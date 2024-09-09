import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const prodcutCode = searchParams.get('PRODUCTCODE');
    try {
        const db = await pool.getConnection();
        const query = "SELECT p.PRODUCTID, p.PRODUCTCODE FROM product p  WHERE p.PRODUCTCODE = ?;";
        const [rows] = await db.execute(query, [prodcutCode]);
        db.release();
        return NextResponse.json(rows)
    }catch(error){
        return NextResponse.json({
            error: error
        }, { status:500 })
    }
}