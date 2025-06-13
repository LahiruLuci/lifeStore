import { NextResponse } from "next/server";
import pool from "../../config/mysql";

export async function POST(request){
    const { email, productCode, year } = await request.json();
    const secretCode = request.headers.get('SECRETCODE');
    if(secretCode == process.env.SECRET_CODE4){
        if(email && productCode && year){
            try{
                const adminId = "LifeStore";
                const postData1 = await fetch(`${process.env.NEXT_PRIVATE_URL3}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "X-Secret": `${process.env.X_SECRET}`,
                    },
                    body: JSON.stringify({
                        "subscriberId": email, //keep the param name as subscriberId, because in the backend defined param as it is. 
                        "adminId": adminId,
                    }),
                });
                const result1 = await postData1.json();
                // console.log(result1.jwt);

                if(result1.success && result1.jwt){
                    const jwt = result1.jwt;
                    try{
                        const db = await pool.getConnection();
                        const query = "SELECT p.PRODUCTCODE FROM product p WHERE p.PRODUCTCODE = ?";
                        const [productRows] = await db.execute(query, [productCode]);
                        db.release();

                        if(productRows.error){
                            alert(productRows.error);
                        }else if(productRows.length > 0){
                            const fetchedProductCode = productRows[0].PRODUCTCODE;
                            // console.log(fetchedProductCode);
                            const payload2 = {
                                email,
                                productCode : Number(fetchedProductCode),
                                year : Number(year)
                            }
                            // console.log(payload2);

                            try{
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
                                if(result2.success){
                                    const resultProps = result2.response;
                                    if(!resultProps.key == null || !resultProps.key == ""){
                                        const licensekey = resultProps.key;

                                        return NextResponse.json({ 
                                            error: 0,
                                            message: "Product Subscribed Successfully!", 
                                            key : licensekey
                                        });
                                    }else{
                                        return NextResponse.json({
                                            error: 1,
                                            message: "Invalid Subscription."
                                        });
                                    }
                                }else{
                                    return NextResponse.json({
                                        error: 1,
                                        message: "Product not Subscribe."
                                    });
                                }
                            }catch(error){
                                return NextResponse.json({
                                    error: 1,
                                    message: error.message
                                }, {status: 404})
                            }
                        }
                    }catch(error){
                        return NextResponse.json({
                            error: 1,
                            message: error.message
                        }, {status: 404})
                    }
                }else{
                    const reason = result1.reason;
                    return NextResponse.json(reason);
                }               
            }catch (error){
                return NextResponse.json({
                    error: 1,
                    message: error.message
                }, {status: 404})
            }
        }else{
            return NextResponse.json({
                error: 1,
                message: "Missing Parameters."
        });
        }
    }else{
        return NextResponse.json({
            error: 1,
            message: "Something wrong with the secret code."
        });
    }
}