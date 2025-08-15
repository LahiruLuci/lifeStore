// // app/api/generate-license/route.js
// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import pool from "../../config/mysql"; // same style as your other routes

// export const runtime = "nodejs";

// function makeLicenseKey({ orderId, productCode, email }) {
//   const secret = process.env.LICENSE_SECRET || "change-me";
//   const nonce = crypto.randomBytes(8).toString("hex");
//   const raw = crypto
//     .createHmac("sha256", secret)
//     .update(`${orderId}|${productCode}|${email}|${nonce}`)
//     .digest("base64url")
//     .toUpperCase()
//     .replace(/[^A-Z0-9]/g, "");

//   // 25 chars => XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
//   const short = raw.slice(0, 25);
//   return short.match(/.{1,5}/g).join("-");
// }

// export async function POST(req) {
//   const { order_id, productCode, email } = await req.json();

//   if (!order_id || !productCode || !email) {
//     return NextResponse.json(
//       { success: false, error: "order_id, productCode and email are required" },
//       { status: 400 }
//     );
//   }

//   const db = await pool.getConnection();
//   try {
//     // Ensure order exists and paid
//     const [rows] = await db.query(
//       "SELECT LICENSEKEY, PAYHERESTATUSCODE FROM subscription WHERE ORDERID = ? LIMIT 1",
//       [order_id]
//     );

//     if (!rows || rows.length === 0) {
//       return NextResponse.json(
//         { success: false, error: "Order not found" },
//         { status: 404 }
//       );
//     }

//     const row = rows[0];

//     // Idempotent: if key already exists, return it
//     if (row.LICENSEKEY) {
//       return NextResponse.json({
//         success: true,
//         licenseKey: row.LICENSEKEY,
//         duplicate: true,
//       });
//     }

//     // Must be confirmed paid (PayHere uses 2 for success)
//     if (String(row.PAYHERESTATUSCODE) !== "2") {
//       return NextResponse.json(
//         { success: false, error: "Payment not confirmed for this order" },
//         { status: 409 }
//       );
//     }

//     // Generate a unique key (retry a few times to avoid any collision)
//     let licenseKey = null;
//     for (let i = 0; i < 5; i++) {
//       const candidate = makeLicenseKey({ orderId: order_id, productCode, email });
//       const [dups] = await db.query(
//         "SELECT 1 FROM subscription WHERE LICENSEKEY = ? LIMIT 1",
//         [candidate]
//       );
//       if (!dups.length) {
//         licenseKey = candidate;
//         break;
//       }
//     }
//     if (!licenseKey) throw new Error("Failed to generate a unique license key");

//     await db.query(
//       "UPDATE subscription SET LICENSEKEY = ? WHERE ORDERID = ?",
//       [licenseKey, order_id]
//     );

//     return NextResponse.json({ success: true, licenseKey });
//   } catch (err) {
//     console.error("[/api/generate-license] error:", err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   } finally {
//     db.release();
//   }
// }





import pool from "../../config/mysql";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Generate License API - Received data:", data);
    
    const { email, productCode, phone, orderId } = data;
    
    if (!email || !productCode || !phone || !orderId) {
      console.error("Generate License API - Missing required fields");
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email, productCode, phone, and orderId are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log("Step 1: Getting order details from database...");
    
    // Get order details including amount from database
    const db = await pool.getConnection();
    
    const checkQuery = `SELECT * FROM subscription WHERE ORDERID = ?`;
    const [existingRows] = await db.query(checkQuery, [orderId]);
    
    if (existingRows.length === 0) {
      console.error("Order not found:", orderId);
      db.release();
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Order not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const orderData = existingRows[0];
    const amount = parseFloat(orderData.AMOUNT);
    
    console.log("Order data retrieved:", {
      orderId: orderData.ORDERID,
      amount: amount,
      productCode: orderData.PRODUCT
    });
    
    db.release();

    console.log("Step 2: Generating JWT token...");
    
    // Step 2: Generate JWT Token
    const jwtPayload = {
      subscriberId: phone,
      adminId: email,
    };

    const jwtResponse = await fetch(process.env.NEXT_PRIVATE_URL3, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Secret": process.env.X_SECRET,
      },
      body: JSON.stringify(jwtPayload),
    });

    const jwtResult = await jwtResponse.json();
    console.log("JWT Response:", jwtResult);
    
    if (!jwtResult.success || !jwtResult.jwt) {
      console.error("JWT generation failed:", jwtResult);
      return new Response(JSON.stringify({ 
        success: false, 
        error: jwtResult.response || 'Failed to generate JWT token' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log("Step 3: Activating product with KSS...");
    
    // Step 3: Activate Product with KSS - now including amount
    const activatePayload = {
      email,
      productCode: parseInt(productCode),
      year: 1,
      amount: amount // Add the amount field
    };

    console.log("Activate payload:", activatePayload);
    console.log("Using JWT:", jwtResult.jwt);
    console.log("KSS URL:", process.env.NEXT_PRIVATE_URL9);

    const kssResponse = await fetch(process.env.NEXT_PRIVATE_URL9, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwtResult.jwt}`,
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(activatePayload),
    });

    console.log("KSS Response Status:", kssResponse.status);
    
    if (!kssResponse.ok) {
      const errorText = await kssResponse.text();
      console.error("KSS API Error Response:", errorText);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `KSS API Error: ${kssResponse.status} - ${errorText}` 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const kssResult = await kssResponse.json();
    console.log("KSS Response:", kssResult);

    if (!kssResult.success) {
      console.error("KSS activation failed:", kssResult);
      return new Response(JSON.stringify({ 
        success: false, 
        error: kssResult.message || kssResult.response || 'Product activation failed' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const resultProps = kssResult.response;
    if (!resultProps || !resultProps.key) {
      console.error("No license key in KSS response:", resultProps);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'No license key generated by KSS' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const licenseKey = resultProps.key;
    console.log("Step 4: License key generated:", licenseKey);

    // Step 4: Store License Key in Database
    console.log("Step 5: Storing license key in database...");
    
    const db2 = await pool.getConnection();
    
    // Update with license key
    const updateQuery = `UPDATE subscription SET LICENSEKEY = ? WHERE ORDERID = ?`;
    const [updateResult] = await db2.query(updateQuery, [licenseKey, orderId]);
    
    console.log("Database update result:", updateResult);
    db2.release();

    if (updateResult.affectedRows === 0) {
      console.error("Failed to update database");
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to store license key' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log("License key stored successfully!");
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'License key generated and stored successfully',
      licenseKey: licenseKey,
      amount: amount
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Generate License API - Error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error: ' + error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}