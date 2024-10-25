import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function POST(request) {
    const { sltbbid, SECRETCODE } = await request.json();
    if (SECRETCODE == process.env.SECRET_CODE2) {
        if (sltbbid) {
            try {
                const adminId = "BizlifePackage";
                const postData1 = await fetch(`${process.env.NEXT_PRIVATE_URL3}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "X-Secret": `${process.env.X_SECRET}`,
                    },
                    body: JSON.stringify({
                        "subscriberId": sltbbid,
                        "adminId": adminId,
                    }),
                });
                const result1 = await postData1.json();
                if (result1.success && result1.jwt) {
                    const jwt = result1.jwt;
                    try {
                        const db = await pool.getConnection();
                        let query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE SLTBBID = ?";
                        let [rows] = await db.execute(query, [sltbbid]);
                        if (rows.length === 0) {
                            query = "INSERT INTO `systemuser` (USERID,SLTBBID,EMAIL,CREATEDUSER,LASTUPDATEDUSER) VALUES (?,?,?,?,?);";
                            await db.execute(query, [sltbbid, sltbbid, email, adminId, adminId]);

                            query = "SELECT USERID, SLTBBID, USERROLE, EMAIL, PASSWORD FROM `systemuser` WHERE SLTBBID = ? AND EMAIL = ?";
                            [rows] = await db.execute(query, [sltbbid, email]);
                        }
                        db.release();
                        if (rows.error) {
                            return NextResponse.json(rows.error);
                        } else if (rows.length > 0) {
                            if (rows[0].USERID) {
                                const fetchedUSERID = rows[0].USERID;

                                if (fetchedUSERID) {
                                    // return NextResponse.json("user entered");
                                    try {
                                        const db = await pool.getConnection();
                                        try {

                                            const selectSubscriptionsCountQuery = `SELECT * FROM subscription s LEFT JOIN product p ON s.PRODUCT = p.PRODUCTID LEFT JOIN status st ON st.STATUSID = s.STATUS WHERE s.USER = ? AND s.STATUS = ? AND s.CREATEDUSER = ?`;
                                            const [countResult] = await db.execute(selectSubscriptionsCountQuery, [fetchedUSERID, '3', "BizlifePackage"]);

                                            const selectSubscriptionsCountQuery2 = `SELECT * FROM subscription s LEFT JOIN product p ON s.PRODUCT = p.PRODUCTID LEFT JOIN status st ON st.STATUSID = s.STATUS WHERE s.USER = ? AND s.STATUS = ? AND s.CREATEDUSER = ?`;
                                            const [countResult2] = await db.execute(selectSubscriptionsCountQuery2, [fetchedUSERID, '4', "BizlifePackage"]);

                                            db.release();

                                            if (countResult.length > 0) {
                                                const subscriptionId = countResult[0].SUBSCRIPTIONID;
                                                if (subscriptionId && subscriptionId != null) {

                                                    try {

                                                        const payload2 = {
                                                            subscriptionId,
                                                        };

                                                        const postData2 = await fetch(`${process.env.NEXT_PRIVATE_URL5}`, {
                                                            method: "POST",
                                                            headers: {
                                                                "Authorization": `Bearer ${jwt}`,
                                                                "Content-Type": "application/json",
                                                                "Access-Control-Allow-Origin": "*"
                                                            },
                                                            body: JSON.stringify(payload2),
                                                        });

                                                        const result2 = await postData2.json();
                                                        if (result2.success) {
                                                            const description = "unsubscribed";
                                                            try {
                                                                const db = await pool.getConnection();
                                                                const updateSubscriptionQuery = "UPDATE subscription SET STATUS = ?,  LASTUPDATEDUSER = ? WHERE SUBSCRIPTIONID = ?";
                                                                await db.execute(updateSubscriptionQuery, ['4', adminId, subscriptionId]);
                                                                
                                                                db.release();
                                                                return NextResponse.json({ message: "Product Unsubscribed Successfully!", subscriptionId, description });
                                                            } catch (error) {
                                                                return NextResponse.json({
                                                                    error: error.message,
                                                                }, { status: 404 });
                                                            }
                                                        } else {
                                                            return NextResponse.json({ error: "Something Wrong with Product Unsubscription." });
                                                        }

                                                    } catch (error) {
                                                        return NextResponse.json({ error: 'Error Unsubscribing product:', error });
                                                    }
                                                } else {
                                                    return NextResponse.json({ error: "No such a product available!" });
                                                }
                                            }
                                            if (countResult2.length > 0) {
                                                if (countResult2[0].SUBSCRIPTIONID) {
                                                    return NextResponse.json({ error: "Product Unsubscribed Already!" });
                                                } else {
                                                    return NextResponse.json({ error: "No such a product available!" });
                                                }
                                            }
                                            return NextResponse.json({ message: "Error with the product subscription!" });

                                        } catch (queryError) {
                                            console.error('Error executing query:', queryError);
                                            db.release();
                                            return NextResponse.json({ error: queryError.message }, { status: 404 });
                                        }

                                    } catch (error) {
                                        return NextResponse.json({
                                            error: error.message,
                                        }, { status: 404 });
                                    }

                                } else {
                                    return NextResponse.json({error:"Send all the details(email, sltbbid, productcode)"});
                                }

                            } else {
                                return NextResponse.json({error:"No user found"});
                            }
                        } else {
                            return NextResponse.json({error:"No user found"});
                        }
                    } catch (error) {
                        return NextResponse.json({
                            error: error.message
                        }, { status: 400 })
                    }

                } else {
                    const reason = result1.reason;
                    return NextResponse.json(reason);
                }

            } catch (error) {
                return NextResponse.json({
                    error: error.message
                }, { status: 404 })
            }
        }
    } else {
        return NextResponse.json({error:"Something wrong with the Secret!"});
    }

}