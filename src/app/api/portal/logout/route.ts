import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PORTAL_COOKIE } from "../../../../lib/portalAuth";

export async function POST() {
  (await cookies()).set(PORTAL_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}
