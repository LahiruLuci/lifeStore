import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export default async function POST(request){
    const {bbid, newBbid} = await request.json();
    const secretCode = request.headers.get('SECRETCODE');
    if(secretCode == process.env.SECRET_CODE5){
        if(bbid && newBbid){
            try{
                const db = await pool.getConnection();
                const query = "SELECT USERID FROM systemuser WHERE USERID = ?"
                const [fetchedBbid] = await db.execute(query, bbid);
                db.release();

                if(fetchedBbid.length > 0){
                    const db = await pool.getConnection();
                    const query = "UPDATE "
                }else{
                    return NextResponse.json({
                        error: 1,
                        message: "Wrong BBID."
                    })
                }
            }catch{}
        }else{
            return NextResponse.json({
            error: 1,
            message: "Something wrong with the params."
        });
        }
    }else{
        return NextResponse.json({
            error: 1,
            message: "Something wrong with the secret code."
        });
    }
}