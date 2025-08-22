// import crypto from "crypto";
// import { emit } from "process";
// import md5 from "crypto-js/md5";

// export async function POST(request) {
//     const body = await request.json();

//     const {
//         first_name,
//         last_name,
//         email,
//         phone,
//         address,
//         city,
//         order_id,
//         items,
//         amount,
//         currency = "LKR",
//     } = body;

//     const merchant_id = process.env.PAYHERE_MERCHANT_ID;
//     const merchant_secret = process.env.PAYHERE_SECRET;

//     //generate hash
//     const hashedSecret = md5(merchant_secret).toString().toUpperCase();
//     const amountFormatted = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
//     const hash = md5(merchant_id + order_id + amountFormatted + currency + hashedSecret).toString().toUpperCase();

//     const return_url = "http://localhost:3000/adminProductList";
//     const cancel_url = "http://localhost:3000/adminProductList";
//     const notify_url = "https://ad6f66119835.ngrok-free.app/api/payhere-notify";

//     //build form
//     const form = `
//     <form id="payhere-form" method="post" action="https://sandbox.payhere.lk/pay/checkout">
//       <input type="hidden" name="merchant_id" value="${merchant_id}" />
//       <input type="hidden" name="return_url" value="${return_url}" />
//       <input type="hidden" name="cancel_url" value="${cancel_url}" />
//       <input type="hidden" name="notify_url" value="${notify_url}" />
//       <input type="hidden" name="order_id" value="${order_id}" />
//       <input type="hidden" name="items" value="${items}" />
//       <input type="hidden" name="currency" value="${currency}" />
//       <input type="hidden" name="amount" value="${amount}" />
//       <input type="hidden" name="first_name" value="${first_name}" />
//       <input type="hidden" name="last_name" value="${last_name}" />
//       <input type="hidden" name="email" value="${email}" />
//       <input type="hidden" name="phone" value="${phone}" />
//       <input type="hidden" name="address" value="${address}" />
//       <input type="hidden" name="city" value="${city}" />
//       <input type="hidden" name="country" value="Sri Lanka" />
//       <input type="hidden" name="hash" value="${hash}" />
//     </form>
//     <script>document.getElementById('payhere-form').submit();</script>
//   `;

//     console.log("form data: ", form);

//     return new Response(form, {
//         headers: { "Content-Type": "text/html" },
//         status: 200,
//     });

// }

// import crypto from "crypto";
// import { emit } from "process";
// import md5 from "crypto-js/md5";

// export async function POST(request) {
//     const body = await request.json();

//     const {
//         first_name,
//         last_name,
//         email,
//         phone,
//         address,
//         city,
//         order_id,
//         items,
//         amount,
//         currency = "LKR",
//     } = body;

//     const merchant_id = process.env.PAYHERE_MERCHANT_ID;
//     const merchant_secret = process.env.PAYHERE_SECRET;

//     //generate hash
//     const hashedSecret = md5(merchant_secret).toString().toUpperCase();
//     const amountFormatted = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
//     const hash = md5(merchant_id + order_id + amountFormatted + currency + hashedSecret).toString().toUpperCase();

//     const return_url = "http://localhost:3000/adminProductList";
//     const cancel_url = "http://localhost:3000/adminProductList";
//     const notify_url = "https://cd18104d6109.ngrok-free.app/api/payhere-notify";

//     //build form
//     const form = `
//     <form id="payhere-form" method="post" action="https://sandbox.payhere.lk/pay/checkout">
//       <input type="hidden" name="merchant_id" value="${merchant_id}" />
//       <input type="hidden" name="return_url" value="${return_url}" />
//       <input type="hidden" name="cancel_url" value="${cancel_url}" />
//       <input type="hidden" name="notify_url" value="${notify_url}" />
//       <input type="hidden" name="order_id" value="${order_id}" />
//       <input type="hidden" name="items" value="${items}" />
//       <input type="hidden" name="currency" value="${currency}" />
//       <input type="hidden" name="amount" value="${amount}" />
//       <input type="hidden" name="first_name" value="${first_name}" />
//       <input type="hidden" name="last_name" value="${last_name}" />
//       <input type="hidden" name="email" value="${email}" />
//       <input type="hidden" name="phone" value="${phone}" />
//       <input type="hidden" name="address" value="${address}" />
//       <input type="hidden" name="city" value="${city}" />
//       <input type="hidden" name="country" value="Sri Lanka" />
//       <input type="hidden" name="hash" value="${hash}" />
//     </form>
//     <script>document.getElementById('payhere-form').submit();</script>
//   `;

//     console.log("form data: ", form);

//     return new Response(form, {
//         headers: { "Content-Type": "text/html" },
//         status: 200,
//     });

// }


// // Updated route.js for PayHere - Auto-close tab and notify opener
// import md5 from "crypto-js/md5";

// export async function POST(request) {
//   const body = await request.json();

//   const {
//     first_name,
//     last_name,
//     email,
//     phone,
//     address,
//     city,
//     order_id,
//     items,
//     amount,
//     currency = "LKR",
//   } = body;

//   const merchant_id = process.env.PAYHERE_MERCHANT_ID;
//   const merchant_secret = process.env.PAYHERE_SECRET;

//   // Generate hash
//   const hashedSecret = md5(merchant_secret).toString().toUpperCase();
//   const amountFormatted = parseFloat(amount)
//     .toLocaleString("en-us", { minimumFractionDigits: 2 })
//     .replaceAll(",", "");
//   const hash = md5(
//     merchant_id + order_id + amountFormatted + currency + hashedSecret
//   )
//     .toString()
//     .toUpperCase();

//   // Instead of redirecting to adminProductList,
//   // make return/cancel pages that close themselves and notify opener
//   const return_url = `http://localhost:3000/payhere-redirect?status=success&order_id=${order_id}`;
//   const cancel_url = `http://localhost:3000/payhere-redirect?status=cancelled&order_id=${order_id}`;
//   const notify_url = "https://d89e63c34158.ngrok-free.app/api/payhere-notify";

//   // Build PayHere redirect form
//   const form = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <title>Redirecting to PayHere...</title>
//         <meta charset="utf-8">
//         <style>
//             body { font-family: Arial, sans-serif; text-align: center; margin: 50px; }
//             .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 20px auto; }
//             @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//         </style>
//     </head>
//     <body>
//         <h2>Redirecting to PayHere Payment Gateway...</h2>
//         <div class="spinner"></div>
//         <p>Please wait while we redirect you to complete your payment.</p>
        
//         <form id="payhere-form" method="post" action="https://sandbox.payhere.lk/pay/checkout">
//             <input type="hidden" name="merchant_id" value="${merchant_id}" />
//             <input type="hidden" name="return_url" value="${return_url}" />
//             <input type="hidden" name="cancel_url" value="${cancel_url}" />
//             <input type="hidden" name="notify_url" value="${notify_url}" />
//             <input type="hidden" name="order_id" value="${order_id}" />
//             <input type="hidden" name="items" value="${items}" />
//             <input type="hidden" name="currency" value="${currency}" />
//             <input type="hidden" name="amount" value="${amount}" />
//             <input type="hidden" name="first_name" value="${first_name}" />
//             <input type="hidden" name="last_name" value="${last_name}" />
//             <input type="hidden" name="email" value="${email}" />
//             <input type="hidden" name="phone" value="${phone}" />
//             <input type="hidden" name="address" value="${address}" />
//             <input type="hidden" name="city" value="${city}" />
//             <input type="hidden" name="country" value="Sri Lanka" />
//             <input type="hidden" name="hash" value="${hash}" />
//         </form>
        
//         <script>
//             // Auto-submit after 2 seconds
//             setTimeout(function() {
//                 document.getElementById('payhere-form').submit();
//             }, 2000);
//         </script>
//     </body>
//     </html>
//   `;

//   return new Response(form, {
//     headers: { "Content-Type": "text/html" },
//     status: 200,
//   });
// }



// Updated route.js for PayHere - Auto-close tab and notify opener
import md5 from "crypto-js/md5";

export async function POST(request) {
  const body = await request.json();

  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    order_id,
    items,
    amount,
    currency = "LKR",
  } = body;

  const merchant_id = process.env.PAYHERE_MERCHANT_ID;
  const merchant_secret = process.env.PAYHERE_SECRET;

  // Generate hash
  const hashedSecret = md5(merchant_secret).toString().toUpperCase();
  const amountFormatted = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const hash = md5(
    merchant_id + order_id + amountFormatted + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

  // make return/cancel pages that close themselves and notify opener
  const return_url = `https://kaspersky-annual.slt.lk/payhere-redirect?status=success&order_id=${order_id}`;
  const cancel_url = `https://kaspersky-annual.slt.lk/payhere-redirect?status=cancelled&order_id=${order_id}`;
  const notify_url = "https://kaspersky-annual.slt.lk/api/payhere-notify";

  // Build PayHere redirect form
const form = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
  </head>
  <body>
      <form id="payhere-form" method="post" action="https://www.payhere.lk/pay/checkout">
          <input type="hidden" name="merchant_id" value="${merchant_id}" />
          <input type="hidden" name="return_url" value="${return_url}" />
          <input type="hidden" name="cancel_url" value="${cancel_url}" />
          <input type="hidden" name="notify_url" value="${notify_url}" />
          <input type="hidden" name="order_id" value="${order_id}" />
          <input type="hidden" name="items" value="${items}" />
          <input type="hidden" name="currency" value="${currency}" />
          <input type="hidden" name="amount" value="${amount}" />
          <input type="hidden" name="first_name" value="${first_name}" />
          <input type="hidden" name="last_name" value="${last_name}" />
          <input type="hidden" name="email" value="${email}" />
          <input type="hidden" name="phone" value="${phone}" />
          <input type="hidden" name="address" value="${address}" />
          <input type="hidden" name="city" value="${city}" />
          <input type="hidden" name="country" value="Sri Lanka" />
          <input type="hidden" name="hash" value="${hash}" />
      </form>

      <script>
          document.getElementById('payhere-form').submit();
      </script>
  </body>
  </html>
`;


  return new Response(form, {
    headers: { "Content-Type": "text/html" },
    status: 200,
  });
}
