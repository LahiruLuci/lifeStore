// src/app/api/admin-warn/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { ensureTables } from "../../db/ensure-tables.js";
import { runAdminWarnNotifierOnce } from "../../lib/adminWarnNotifier.js";

export async function GET() {
  try {
    await ensureTables();
    const result = await runAdminWarnNotifierOnce();
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (e) {
    console.error("[ADMIN-WARN-API]", e);
    return NextResponse.json(
      { success: false, error: e?.message },
      { status: 500 }
    );
  }
}
