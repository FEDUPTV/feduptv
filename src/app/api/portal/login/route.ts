import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getPortalSessionValue,
  isPortalDisabled,
  isCorrectPortalPassword,
  portalCookieOptions,
  PORTAL_COOKIE,
} from "../../../../lib/portalAuth";

export async function POST(request: Request) {
  if (isPortalDisabled()) {
    return NextResponse.json(
      { success: false, error: "Portal is temporarily disabled." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = String(body.password || "");

  if (!isCorrectPortalPassword(password)) {
    return NextResponse.json(
      { success: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  (await cookies()).set(
    PORTAL_COOKIE,
    getPortalSessionValue(),
    portalCookieOptions()
  );

  return NextResponse.json({ success: true });
}
