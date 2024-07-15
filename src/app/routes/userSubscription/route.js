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

export async function POST(req) {
    try {
      const {user, productName, licensekey, amount} = await req.json();

      const db = await pool.getConnection();
      const selectProductQuery = "SELECT * FROM product WHERE PRODUCTNAME= ?";
      const [productResult] = await db.execute(selectProductQuery, productName);
  
      const productId = productResult[0].PRODUCTID;
      let admin_id = localStorage.getItem('admin_id');

      const subscriptionResult = [];
      if(admin_id){
        const insertSubscriptionQuery = "INSERT INTO subscription (USER, PRODUCT, PAYMENTMETHOD, LICENSEKEY, AMOUNT, STATUS, CREATEDUSER, LASTUPDATEDUSER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        subscriptionResult = await db.execute(insertSubscriptionQuery, [user, productId, '2', licensekey, amount, '3', admin_id, admin_id]);
      }else{
        const insertSubscriptionQuery = "INSERT INTO subscription (USER, PRODUCT, PAYMENTMETHOD, LICENSEKEY, AMOUNT, STATUS, CREATEDUSER, LASTUPDATEDUSER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        subscriptionResult = await db.execute(insertSubscriptionQuery, [user, productId, '2', licensekey, amount, '3', user, user]);
      }
      const subscriptionId = subscriptionResult.insertId;

  
      db.release();
      return NextResponse.json({ message: "Product Subscribed Successfully!" , subscriptionId});
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }

  export async function PATCH(req) {
    try {
      const { user, subscriptionId, licensekey } = await req.json();
  
      const db = await pool.getConnection();
      let admin_id = localStorage.getItem('admin_id');

      if(admin_id){
        const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
        await db.execute(updateSubscriptionQuery, ['4', admin_id, subscriptionId]);
      }else{
        const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
        await db.execute(updateSubscriptionQuery, ['4', user, subscriptionId]);
      }

      db.release();
      return NextResponse.json({ message: "Product Unsubscribed Successfully!", subscriptionId });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }