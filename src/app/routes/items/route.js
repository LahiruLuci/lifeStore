import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(){
    try {
        const db = await pool.getConnection();
        const query = "SELECT p.PRODUCTID, p.PRODUCTTITLE, p.PRODUCTNAME, p.PREDESCRIPTION, p.IMAGELOCATION, COUNT(s.SUBSCRIPTIONID) AS SUBSCRIPTIONCOUNT, SUM(CASE WHEN DATE(s.CREATEDDATETIME) = CURDATE() THEN 1 ELSE 0 END) AS TODAYSUBSCRIPTIONCOUNT, GROUP_CONCAT(CONCAT('SUBSCRIPTIONID: ', s.SUBSCRIPTIONID, ', USER: ', s.USER, ', PAYMENTMETHOD: ', s.PAYMENTMETHOD, ', LICENSEKEY: ', s.LICENSEKEY, ', AMOUNT: ', s.AMOUNT, ', STATUS: ', s.STATUS, ', CREATEDDATETIME: ', s.CREATEDDATETIME, ', LASTUPDATEDDATETIME: ', s.LASTUPDATEDDATETIME, ', CREATEDUSER: ', s.CREATEDUSER, ', LASTUPDATEDUSER: ', s.LASTUPDATEDUSER) SEPARATOR ' | ') AS SUBSCRIPTION FROM kaspersky_db.product p LEFT JOIN kaspersky_db.subscription s ON p.PRODUCTID = s.PRODUCT GROUP BY p.PRODUCTID ORDER BY p.SORTID ASC;";
        const [rows] = await db.execute(query);
        db.release();
        return NextResponse.json(rows)
    }catch(error){
        return NextResponse.json({
            error: error
        }, { status:500 })
    }
}