import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function POST(request) {
    try {
        const { sltbbid, status } = await request.json();
        const secretCode = request.headers.get('SECRETCODE');

        // Validate secret code
        if (secretCode !== process.env.SECRET_CODE3) {
            return NextResponse.json(
                { error: 1, message: "Invalid Secret Code!" },
                { status: 403 }
            );
        }

        // Validate required parameters
        if (!sltbbid || !status) {
            return NextResponse.json(
                { error: 1, message: "Missing required parameters!" },
                { status: 400 }
            );
        }

        const adminId = "KasperskyWithCRM";
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
            let db;
            if (status === 'suspend') {
                
                try {
                    db = await pool.getConnection();
                    let query = "SELECT s.USER, s.SUBSCRIPTIONID, p.PRODUCTCODE FROM subscription s INNER JOIN product p ON s.PRODUCT = p.PRODUCTID WHERE s.CREATEDUSER = 'KasperskyWithCRM' AND s.USER = ?";
                    const [result] = await db.execute(query, [sltbbid]);
                    const user = result[0]?.SUBSCRIPTIONID;
                    db.release();
                    // console.log(user);
                    // console.log(sltbbid);
                    const payload = {
                        subscriberId: sltbbid
                    };
                            try{
                                const postData2 = await fetch(`${process.env.NEXT_PRIVATE_URL7}`, {
                                    method: "PATCH",
                                    headers: {
                                        "Authorization": `Bearer ${jwt}`,
                                        "Content-type": "application/json"
                                        // "Access-Control-Allow-Origin": "*"
                                    },
                                    body: JSON.stringify(payload),
                                    
                                });
                                
                                // const responseText = await postData2.text();
                                // console.log('Response details:', responseText);

                                try{
                                    if(postData2.ok){
                                        db = await pool.getConnection();
                                        let query = "UPDATE subscription SET STATUS = 2 WHERE SUBSCRIPTIONID = ?";
                                        await db.execute(query, [user]);
                                        db.release();
    
                                        return NextResponse.json({ 
                                            error: 0,
                                            message: "Product Suspended Successfully!"
                                        });
                                    }else {
                                        return NextResponse.json({
                                            error: 1,
                                            message: postData2.message || "Failed to suspend!",
                                        }, { status: 400 });
                                    }

                                }catch(error){
                                    return NextResponse.json({
                                        error: 1,
                                        Message: error.message
                                    })
                                }
                                
                            }catch (error){
                                return NextResponse.json({
                                    error: 1,
                                    Message: error.message
                                }, { status: 404 });
                            }
                } catch (error) {
                    if (db) db.release();
                    return NextResponse.json(
                        { error: 1, message: error.message },
                        { status: 500 }
                    );
                }
            }else if(status === 'reactive'){
                    let db;
                try {
                    db = await pool.getConnection();
                    let query = "SELECT s.USER, s.SUBSCRIPTIONID, p.PRODUCTCODE FROM subscription s INNER JOIN product p ON s.PRODUCT = p.PRODUCTID WHERE s.CREATEDUSER = 'KasperskyWithCRM' AND s.USER = ?";
                    const [result] = await db.execute(query, [sltbbid]);
                    const user = result[0]?.SUBSCRIPTIONID;
                    db.release();
                    // console.log(user);
                    // console.log(sltbbid);
                    const payload = {
                        subscriberId: sltbbid
                    };
                            try{
                                const postData2 = await fetch(`${process.env.NEXT_PRIVATE_URL8}`, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": `Bearer ${jwt}`,
                                        "Content-type": "application/json"
                                        // "Access-Control-Allow-Origin": "*"
                                    },
                                    body: JSON.stringify(payload),
                                    
                                });
                                
                                // const responseText = await postData2.text();
                                // console.log('Response details:', responseText);

                                try{
                                    if(postData2.ok){
                                        db = await pool.getConnection();
                                        let query = "UPDATE subscription SET STATUS = 3 WHERE SUBSCRIPTIONID = ?";
                                        await db.execute(query, [user]);
                                        db.release();
    
                                        return NextResponse.json({ 
                                            error: 0,
                                            message: "Product Reactivated Successfully!"
                                        });
                                    }else {
                                        return NextResponse.json({
                                            error: 1,
                                            message: postData2.message || "Failed to reactivate!",
                                        }, { status: 400 });
                                    }

                                }catch(error){
                                    return NextResponse.json({
                                        error: 1,
                                        Message: error.message
                                    })
                                }
                                
                            }catch (error){
                                return NextResponse.json({
                                    error: 1,
                                    Message: error.message
                                }, { status: 404 });
                            }
                } catch (error) {
                    if (db) db.release();
                    return NextResponse.json(
                        { error: 1, message: error.message },
                        { status: 500 }
                    );
                }
            } else  {
                return NextResponse.json(
                    { error: 1, message: "Invalid status value!" },
                    { status: 400 }
                );
            }

        } else {
            return NextResponse.json(
                { error: 1, message: result1.reason },
                { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: 1, message: error.message },
            { status: 500 }
        );
    }
}
