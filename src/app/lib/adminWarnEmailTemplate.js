// src/app/lib/adminWarnEmailTemplate.js
export function buildAdminWarnEmailHTML({
  name,
  orderId,
  productName,
  amount,
  phone,
  email,
  purchasedAtStr,
}) {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#fff6f6; padding:24px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
      style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px;
             box-shadow:0 4px 18px rgba(0,0,0,0.06); overflow:hidden;">
      <tr>
        <td style="background:#9b1c1c; color:#fff; padding:20px 24px;">
          <h2 style="margin:0; font-size:20px;">⚠️ License Key Not Generated</h2>
          <p style="margin:4px 0 0; opacity:0.95; font-size:12px;">
            Lifestore – Successful Payment but Missing License Key
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:24px;">
          <p style="margin:0 0 12px; color:#111; font-size:14px;">Hi Team,</p>
          <p style="margin:0 0 16px; color:#111; font-size:14px;">
            A customer has completed a payment, but the system has not generated a license key yet.
            Please generate and activate the key manually via Postman as soon as possible.
          </p>

          <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            ${row("Customer Name:", name)}
            ${row("Order ID:", orderId)}
            ${row("Product:", productName)}
            ${row("Amount:", formatCurrency(amount))}
            ${row("Contact Number:", phone)}
            ${row("Email:", email)}
            ${row("Purchase Date & Time:", purchasedAtStr || "")}
          </table>

          <div style="margin-top:18px; padding:12px; background:#fff1f2; border-left:4px solid #e11d48; font-size:13px; color:#111;">
            <strong>Action Required:</strong> Generate a license key using the internal activation API and confirm delivery to the customer.
          </div>

          <p style="margin:18px 0 0; font-size:12px; color:#666;">
            This warning is valid only for <strong>today’s purchases</strong>.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f8fafc; color:#6b7280; padding:14px 24px; font-size:12px;">
          © ${new Date().getFullYear()} SLT | Kaspersky Lifestore
        </td>
      </tr>
    </table>
  </div>
  `;
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 0; font-size:13px; color:#6b7280; width:36%; vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0; font-size:13px; color:#111; font-weight:600;">
        ${escapeHtml(String(value ?? ""))}
      </td>
    </tr>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatCurrency(amount) {
  const n = Number(amount ?? 0);
  if (Number.isNaN(n)) return String(amount ?? "");
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 2,
  }).format(n);
}
