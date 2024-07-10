import { NextResponse } from "next/server";

let broadBandId;

export async function GET() {
  try {
    return NextResponse.json(broadBandId)
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    broadBandId = await req.json();
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}