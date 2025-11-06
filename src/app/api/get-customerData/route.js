// import pool from "../../config/mysql";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const orderId = searchParams.get('orderId');

//     if (!orderId) {
//       return new Response(JSON.stringify({ 
//         success: false, 
//         error: 'Order ID is required' 
//       }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const db = await pool.getConnection();
//     const query = `SELECT * FROM subscription WHERE ORDERID = ?`;

//     const [rows] = await db.query(query, [orderId]);
//     db.release();

//     if (!rows || rows.length === 0) {
//       return new Response(JSON.stringify({ 
//         success: false, 
//         error: 'OrderID not match!' 
//       }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     return new Response(JSON.stringify({ 
//       success: true, 
//       data: rows[0] 
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (error) {
//     console.error("Error fetching customer data:", error);
//     return new Response(JSON.stringify({ 
//       success: false, 
//       error: 'Internal server error' 
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }


// import pool from "../../config/mysql";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const orderId = searchParams.get('orderId');

//     if (!orderId) {
//       return new Response(JSON.stringify({ 
//         success: false, 
//         error: 'Order ID is required' 
//       }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const db = await pool.getConnection();
//     const query = `SELECT * FROM subscription WHERE ORDERID = ?`;

//     const [rows] = await db.query(query, [orderId]);
//     db.release();

//     if (!rows || rows.length === 0) {
//       return new Response(JSON.stringify({ 
//         success: false, 
//         error: 'OrderID not match!' 
//       }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     return new Response(JSON.stringify({ 
//       success: true, 
//       data: rows[0] 
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (error) {
//     console.error("Error fetching customer data:", error);
//     return new Response(JSON.stringify({ 
//       success: false, 
//       error: 'Internal server error' 
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }



// Make this route dynamic at runtime (not prerendered)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import pool from "../../config/mysql";

export async function GET(request) {
  try {
    // Prefer nextUrl in App Router; fallback to URL(request.url)
    const searchParams =
      request?.nextUrl?.searchParams ?? new URL(request.url).searchParams;

    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Order ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }

    const db = await pool.getConnection();
    await db.query("SET time_zone = '+05:30'");

    try {
      const [rows] = await db.query(
        'SELECT * FROM subscription WHERE ORDERID = ?',
        [orderId]
      );

      if (!rows || rows.length === 0) {
        return new Response(JSON.stringify({
          success: false,
          error: 'OrderID not match!'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        data: rows[0]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    } finally {
      db.release(); // always release
    }

  } catch (error) {
    console.error("Error fetching customer data:", error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
}
