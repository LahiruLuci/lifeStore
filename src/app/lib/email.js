// import nodemailer from "nodemailer";

// const {
//   EMAIL_HOST,
//   EMAIL_PORT,
//   EMAIL_USER,
//   EMAIL_PASS,
//   EMAIL_FROM
// } = process.env;

// if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_FROM) {
//   // Don't crash app; we will throw only when trying to send.
//   console.warn("[EMAIL] Missing one or more EMAIL_* env vars. Emails will fail until set.");
// }

// export function getTransporter() {
//   if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_FROM) {
//     throw new Error("Email is not configured. Please set EMAIL_* env vars.");
//   }

//   return nodemailer.createTransport({
//     host: EMAIL_HOST,
//     port: Number(EMAIL_PORT ?? 587),
//     secure: false,                // STARTTLS on 587
//     auth: EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
//     tls: { rejectUnauthorized: false }, // in case of self-signed chain on corp mail
//   });
// }

// import "server-only";
// import nodemailer from "nodemailer";

// // Optional: one-time startup warning if anything looks missing.
// // (Safe to keep; won't crash your app.)
// (() => {
//   const host = process.env.EMAIL_HOST;
//   const port = process.env.EMAIL_PORT;
//   const user = process.env.EMAIL_USER;
//   const from = process.env.EMAIL_FROM;

//   if (!host || !port || !user || !from) {
//     console.warn("[EMAIL] Missing one or more EMAIL_* env vars. Emails will fail until set.", {
//       EMAIL_HOST: host,
//       EMAIL_PORT: port,
//       EMAIL_USER: user,
//       EMAIL_FROM: from,
//     });
//   }
// })();

// // Reuse a single transporter across calls (dev + prod)
// const globalForEmail = globalThis;
// let cachedTransporter = globalForEmail.__emailTransporter || null;

// /**
//  * Returns a configured Nodemailer transporter.
//  * Throws if required env vars are not present at runtime.
//  */
// export function getTransporter() {
//   if (cachedTransporter) return cachedTransporter;

//   const host = process.env.EMAIL_HOST;
//   const port = process.env.EMAIL_PORT;
//   const user = process.env.EMAIL_USER;
//   const pass = process.env.EMAIL_PASS; // optional
//   const from = process.env.EMAIL_FROM;

//   if (!host || !port || !user || !from) {
//     throw new Error("Email is not configured. Please set EMAIL_* env vars.");
//   }

//   const transporter = nodemailer.createTransport({
//     host,
//     port: Number(port ?? 587),
//     secure: false, // STARTTLS on 587
//     auth: pass ? { user, pass } : undefined,
//     tls: { rejectUnauthorized: false }, // useful if corp mail uses self-signed chain
//   });

//   // Cache for subsequent calls
//   cachedTransporter = transporter;
//   globalForEmail.__emailTransporter = transporter;

//   return transporter;
// }

// /**
//  * Convenience helper for the "from" address, if you need it elsewhere.
//  */
// export function getFromAddress() {
//   return process.env.EMAIL_FROM || "";
// }







import "server-only";

// One-time startup warning (safe to keep)
(() => {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const user = process.env.EMAIL_USER;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !from) {
    console.warn("[EMAIL] Missing one or more EMAIL_* env vars. Emails will fail until set.", {
      EMAIL_HOST: host,
      EMAIL_PORT: port,
      EMAIL_USER: user,
      EMAIL_FROM: from,
    });
  }
})();

// Reuse a single transporter across calls (dev + prod)
const globalForEmail = globalThis;
let cachedTransporter = globalForEmail.__emailTransporter || null;

/**
 * Returns a configured Nodemailer transporter.
 * Uses dynamic import so Next won't bundle nodemailer for client/edge.
 * Throws if required env vars are not present at runtime.
 */
export async function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS; // optional
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !from) {
    throw new Error("Email is not configured. Please set EMAIL_* env vars.");
  }

  // ⬇️ Dynamic import avoids bundling node core deps at build time
  const nodemailer = (await import("nodemailer")).default;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port ?? 587),
    secure: false, // STARTTLS on 587
    auth: pass ? { user, pass } : undefined,
    tls: { rejectUnauthorized: false }, // helpful for corp/self-signed chains
  });

  cachedTransporter = transporter;
  globalForEmail.__emailTransporter = transporter;
  return transporter;
}

/** Convenience helper for the "from" address */
export function getFromAddress() {
  return process.env.EMAIL_FROM || "";
}
