import { NextResponse } from "next/server";
import pool from "../../config/mysql";
import fs from 'fs';
import path from 'path';

export async function GET(){
    try {
        const db = await pool.getConnection();
        const query = "SELECT p.PRODUCTID, p.PRODUCTTITLE, p.PRODUCTNAME, p.PREDESCRIPTION, p.DESCRIPTIONTITLE, p.DESCRIPTION, p.IMAGELOCATION, p.STATUS, p.SORTID, p.CREATEDDATETIME, p.LASTUPDATEDDATETIME, p.CREATEDUSER, p.LASTUPDATEDUSER, GROUP_CONCAT(CASE WHEN pf.PRODUCTFEATURECATEGORY = '5' THEN pf.DESCRIPTION END SEPARATOR ' | ') AS MAINPRODUCTFEATURES, GROUP_CONCAT(CASE WHEN pf.PRODUCTFEATURECATEGORY = '4' THEN pf.DESCRIPTION END SEPARATOR ' | ') AS PRODUCTFEATURES, ppm.AMOUNT FROM product p LEFT JOIN productfeature pf ON p.PRODUCTID = pf.PRODUCT LEFT JOIN productpaymentmethod ppm ON p.PRODUCTID = ppm.PRODUCT  WHERE p.STATUS = '1' GROUP BY p.PRODUCTID, p.PRODUCTTITLE, p.PRODUCTNAME, p.PREDESCRIPTION, p.DESCRIPTIONTITLE, p.DESCRIPTION, p.IMAGELOCATION, p.STATUS, p.CREATEDDATETIME, p.LASTUPDATEDDATETIME, p.CREATEDUSER, p.LASTUPDATEDUSER, ppm.AMOUNT ORDER BY p.SORTID ASC";
        const [rows] = await db.execute(query);
        db.release();
        return NextResponse.json(rows)
    }catch(error){
        return NextResponse.json({
            error: error
        }, { status:500 })
    }
}