import crypto from "crypto";
import { emit } from "process";

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

  //create hash
  const hashData = merchant_id + order_id + amount + currency + merchant_secret;
  const hash = crypto.createHash("sha256").update(hashData).digest("hex");

  const return_url = "http://localhost:3000/payment-success";
  const cancel_url = "http://localhost:3000/payment-cancel";
  const notify_url = "http://localhost:3000/api/payhere-notify";

  //build form
  const form = `
    <form id="payhere-form" method="post" action="https://sandbox.payhere.lk/pay/checkout">
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
    <script>document.getElementById('payhere-form').submit();</script>
  `;

  console.log("form data: ", form);

  return new Response(form, {
    headers: { "Content-Type": "text/html" },
    status: 200,
  });
  
}
