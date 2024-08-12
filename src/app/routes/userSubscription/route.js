import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('USER');

    if (userId) {
        try {
            const db = await pool.getConnection();
            const query = "SELECT p.PRODUCTID, p.PRODUCTCODE, p.PRODUCTNAME, s.SUBSCRIPTIONID, s.PRODUCT, s.LICENSEKEY, s.AMOUNT, s.LASTUPDATEDDATETIME, s.CREATEDDATETIME, st.DESCRIPTION AS STATUSDESCRIPTION,s.LASTUPDATEDUSER FROM subscription s LEFT JOIN product p ON s.PRODUCT = p.PRODUCTID LEFT JOIN status st ON st.STATUSID = s.STATUS WHERE USER = ? GROUP BY s.SUBSCRIPTIONID ORDER BY FIELD(s.STATUS, 3, 2, 4)";
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
  const {subscriberId, user, admin_id, productId, licensekey, amount} = await req.json();

    try {

      const db = await pool.getConnection();
      if(!admin_id === '' || !admin_id === null){
        const insertSubscriptionQuery = "INSERT INTO subscription (SUBSCRIPTIONID, USER, PRODUCT, PAYMENTMETHOD, LICENSEKEY, AMOUNT, STATUS, CREATEDUSER, LASTUPDATEDUSER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await db.execute(insertSubscriptionQuery, [subscriberId, user, productId, '2', licensekey, amount, '3', admin_id, admin_id]);
      }else{
        const insertSubscriptionQuery = "INSERT INTO subscription (SUBSCRIPTIONID, USER, PRODUCT, PAYMENTMETHOD, LICENSEKEY, AMOUNT, STATUS, CREATEDUSER, LASTUPDATEDUSER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await db.execute(insertSubscriptionQuery, [subscriberId, user, productId, '2', licensekey, amount, '3', user, user]);
      }

      db.release();
      return NextResponse.json({ message: "Product Subscribed Successfully!" , subscriberId});
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }

  let description;

  export async function PATCH(req) {

    const { user, admin_id,  subscriptionId, licensekey, statusId } = await req.json();

    try {
      const db = await pool.getConnection();
      if(!admin_id ==='' || !admin_id===null) {
        const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
        await db.execute(updateSubscriptionQuery, [parseInt(statusId), admin_id, subscriptionId]);
        if (statusId===4) {
          description = "unsubscribed";
        }
      } else {
        const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
        await db.execute(updateSubscriptionQuery, [parseInt(statusId), user, subscriptionId]);
        if (statusId===4) {
          description = "unsubscribed";
        }
      }

      db.release();
      return NextResponse.json({ message: "success!", subscriptionId, description });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }