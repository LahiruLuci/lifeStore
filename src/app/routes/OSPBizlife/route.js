import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function POST(request) {
    const { email, sltbbid, productCode } = await request.json();
    const secretCode = request.headers.get("Authorization");
    const amount = 0;
    if(secretCode === `Bearer ${process.env.SECRET_CODE}`){
        if (sltbbid && email && productCode) {
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
                                const fetchedEmail = rows[0].EMAIL;
    
                                if (fetchedUSERID && fetchedEmail && productCode) {
                                    // return NextResponse.json("user entered");
                                    let bizLifeSubscriptionsCount;
                                    try {                                    
                                        const db = await pool.getConnection();
                                        try {
                                    
                                          const selectSubscriptionsCountQuery = `SELECT COUNT(*) AS SUBSCRIPTIONCOUNT FROM subscription s LEFT JOIN product p ON s.PRODUCT = p.PRODUCTID LEFT JOIN status st ON st.STATUSID = s.STATUS WHERE s.USER = ? AND s.STATUS = ? AND s.CREATEDUSER = ?`;
                                    
                                          const [countResult] = await db.execute(selectSubscriptionsCountQuery, [fetchedUSERID, '3', "BizlifePackage"]);
                                    
                                          db.release();
                                    
                                          if (countResult.length > 0) {
                                            bizLifeSubscriptionsCount = countResult[0].SUBSCRIPTIONCOUNT;
                                            if(bizLifeSubscriptionsCount == 0 && bizLifeSubscriptionsCount != null){
                                                try {
                                                    const db = await pool.getConnection();
                                                    const query = "SELECT p.PRODUCTID, p.PRODUCTCODE FROM product p  WHERE p.PRODUCTCODE = ?;";
                                                    const [productRows] = await db.execute(query, [productCode]);
                                                    db.release();
                                                    if (productRows.error) {
                                                        alert(productRows.error);
                                                    } else if (productRows.length > 0) {
                                                        if (productRows[0].PRODUCTID) {
                                                            const fetchedPRODUCTID = productRows[0].PRODUCTID;
                                                            const fetchedPRODUCTCODE = productRows[0].PRODUCTCODE;
                                                            const payload2 = {
                                                                productCode: Number(fetchedPRODUCTCODE),
                                                                email,
                                                                amount: Number(amount),
                                                            };
                                                            try {
                                                                const postData2 = await fetch(`${process.env.NEXT_PRIVATE_URL4}`, {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Authorization": `Bearer ${jwt}`,
                                                                        "Content-type": "application/json",
                                                                        "Access-Control-Allow-Origin": "*"
                                                                    },
                                                                    body: JSON.stringify(payload2),
                                                                });
                                                                const result2 = await postData2.json();
                                                                if (result2.success) {
                                                                    const resultProps = result2.response;
                                                                    if (!resultProps.subscriptionId == null || !resultProps.subscriptionId == "") {
                
                                                                        const subscriberId = resultProps.subscriptionId;
                                                                        const licensekey = resultProps.key;
                                                                        const productId = fetchedPRODUCTID;
                                                                        const admin_id = adminId;
                                                                        const user = sltbbid;
                
                                                                        try {
                
                                                                            const db = await pool.getConnection();
                                                                            if(admin_id){
                                                                              const insertSubscriptionQuery = "INSERT INTO subscription (SUBSCRIPTIONID, USER, PRODUCT, PAYMENTMETHOD, LICENSEKEY, AMOUNT, STATUS, CREATEDUSER, LASTUPDATEDUSER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                                                                              await db.execute(insertSubscriptionQuery, [subscriberId, user, productId, '2', licensekey, amount, '3', admin_id, admin_id]);
                                                                            }else{
                                                                              const insertSubscriptionQuery = "INSERT INTO subscription (SUBSCRIPTIONID, USER, PRODUCT, PAYMENTMETHOD, LICENSEKEY, AMOUNT, STATUS, CREATEDUSER, LASTUPDATEDUSER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                                                                              await db.execute(insertSubscriptionQuery, [subscriberId, user, productId, '2', licensekey, amount, '3', user, user]);
                                                                            }
                                                                      
                                                                            db.release();
                                                                            return NextResponse.json({ 
                                                                                error: 0,
                                                                                message: "Product Subscribed Successfully!" , subscriberId
                                                                            });
                                                                          } catch (error) {
                                                                            return NextResponse.json({
                                                                              error: error.message,
                                                                            }, { status: 404 });
                                                                          }
                
                                                                    } else {
                                                                        return NextResponse.json({
                                                                            error: 1,
                                                                            message: "Invalid Subscription."
                                                                        });
                                                                    }
                                                                } else {
                                                                    return NextResponse.json(result2.error + " : " + result2.reason);
                                                                }
                
                
                                                            } catch (error) {
                                                                return NextResponse.json({
                                                                    error: error.message
                                                                }, { status: 404 });
                                                            }
                
                
                                                        } else {
                                                            return NextResponse.json({
                                                                error:1,
                                                                message: "No product found"
                                                            });
                                                        }
                                                    } else {
                                                        return NextResponse.json({
                                                            error: 1,
                                                            message: "No product found"
                                                        });
                                                    }
                                                } catch (error) {
                                                    return NextResponse.json({
                                                        error: error
                                                    }, { status: 404 })
                                                }
                                            }else{
                                                return NextResponse.json({ 
                                                    error: 0,
                                                    message: "Already assigned a product!",
                                                 });
                                            }
                                          }
                                          return NextResponse.json({ 
                                            error: 1,
                                            message: "Error with the product subscription!"
                                           });
                                    
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
                                    return NextResponse.json({
                                        error: 1,
                                        message: "Send all the details(email, sltbbid, productcode)"
                                    });
                                }
    
                            } else {
                                return NextResponse.json({
                                    error:1,
                                    message: "No user found"
                                });
                            }
                        } else {
                            return NextResponse.json({
                                error:1,
                                message: "No user found"
                            });
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
    }else{
        return NextResponse.json({
            error: 1,
            message: "Something wrong with the Secret!"
        });
    }

}