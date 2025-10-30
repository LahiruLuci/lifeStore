// // Ensure this route runs on the Node runtime (not Edge)
// export const runtime = 'nodejs';

// import { NextResponse } from "next/server";
// import { ensureTables } from "../../db/ensure-tables.js";
// import { runAdminNotifierOnce } from "../../lib/adminNotifier.js";

// export async function GET() {
//   try {
//     await ensureTables();
//     const result = await runAdminNotifierOnce();
//     return NextResponse.json({ success: true, result }, { status: 200 });
//   } catch (e) {
//     console.error("[ADMIN-NOTIFY-API]", e);
//     return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
//   }
// }


export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from "next/server";
import { ensureTables } from "../../db/ensure-tables.js";
import { runAdminNotifierOnce } from "../../lib/adminNotifier.js";

export async function GET() {
  try {
    await ensureTables();
    const result = await runAdminNotifierOnce();
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (e) {
    console.error("[ADMIN-NOTIFY-API]", e);
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}
