import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(){
    try {
        const db = await pool.getConnection();
        const query = "SELECT SUBSCRIPTIONID,USER,product,paymentmethod,LICENSEKEY,AMOUNT,subscription.`STATUS`,subscription.CREATEDDATETIME,subscription.LASTUPDATEDDATETIME,subscription.CREATEDUSER,subscription.LASTUPDATEDUSER,systemuser.PASSWORD,systemuser.SLTBBID,systemuser.INITIALS,systemuser.PREFERREDNAME,systemuser.LASTNAME,systemuser.EMAIL,systemuser.NIC,systemuser.MOBILE,systemuser.USERROLE,systemuser.`STATUS` AS USERSTATUS,systemuser.CREATEDDATETIME AS USERCREATED,product.PRODUCTTITLE,product.PRODUCTNAME,product.CREATEDDATETIME AS PRODUCTCREATED,status.DESCRIPTION AS STATUSDESCRIPTION FROM subscription LEFT JOIN systemuser ON subscription.USER = systemuser.USERID LEFT JOIN product ON subscription.PRODUCT = product.PRODUCTID LEFT JOIN status ON subscription.STATUS=status.STATUSID WHERE subscription.STATUS = 3 ORDER BY subscription.LASTUPDATEDDATETIME DESC";
        const [rows] = await db.execute(query);
        db.release();
        return NextResponse.json(rows)
    }catch(error){
        return NextResponse.json({
            error: error
        }, { status:500 })
    }
}