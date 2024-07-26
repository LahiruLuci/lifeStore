import { Braah_One } from "next/font/google";
import { NextResponse } from "next/server";

// let broadBandId = 'HE2295295';
const email = searchParams.get('EMAIL');

let token = 'eufhrbweircwriyVWCRYIwvrtveyrvERCuercUEFwyebfcWYQECwqr';
let broadBandId;
// let token;

export async function GET() {
  try {
    return NextResponse.json({ broadBandId, token });
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const {cbroadBandId, ctoken} = await req.json();
    broadBandId = cbroadBandId;
    token = ctoken;
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}