import crypto from "crypto";
import { emit } from "process";
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

    //generate hash
    const hashedSecret = md5(merchant_secret).toString().toUpperCase();
    const amountFormatted = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
    const hash = md5(merchant_id + order_id + amountFormatted + currency + hashedSecret).toString().toUpperCase();

    const return_url = "http://localhost:3000/adminProductList";
    const cancel_url = "http://localhost:3000/payment-cancel";
    const notify_url = "https://ebony-sm-lou-classified.trycloudflare.com/api/payhere-notify";

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
