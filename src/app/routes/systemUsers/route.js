import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('EMAIL');
    const sltbbid = searchParams.get('SLTBBID');
if(email){
    try {
        const db = await pool.getConnection();
        const query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE EMAIL = ?";
        const [rows] = await db.execute(query,[email]);
        db.release();
        return NextResponse.json(rows)
    }catch(error){
        return NextResponse.json({
            error: error
        }, { status:500 })
    }
}else if(sltbbid){
    try {
        const db = await pool.getConnection();
        const query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE SLTBBID = ?";
        const [rows] = await db.execute(query,[sltbbid]);
        db.release();
        return NextResponse.json(rows)
    }catch(error){
        return NextResponse.json({
            error: error
        }, { status:500 })
    }
}else{
    return NextResponse.json({
        error: "Incorrect credintials"
    }, { status: 400 });
}
    
}