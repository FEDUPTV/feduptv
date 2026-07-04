import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "./env";

const PORTAL_COOKIE = "fedup_portal_session";
const PORTAL_EMERGENCY_DISABLED = false;

function getPortalPassword() {
  if (!env.portalPassword) {
    throw new Error("Missing required environment variable: PORTAL_PASSWORD");
  }

  return env.portalPassword;
}

function getSessionSecret() {
  if (!env.portalSessionSecret) {
    throw new Error(
      "Missing required environment variable: PORTAL_SESSION_SECRET"
    );
  }

  return env.portalSessionSecret;
}

export function isPortalDisabled() {
  return PORTAL_EMERGENCY_DISABLED || env.portalDisabled;
}

export function getPortalSessionValue() {
  return createHmac("sha256", getSessionSecret())
    .update("fedup-portal")
    .digest("hex");
}

export function isCorrectPortalPassword(password: string) {
  const expected = Buffer.from(getPortalPassword());
  const actual = Buffer.from(password);

  return (
    expected.length === actual.length &&
    timingSafeEqual(expected, actual)
  );
}

export async function isPortalAuthenticated() {
  if (isPortalDisabled()) return false;

  const session = (await cookies()).get(PORTAL_COOKIE)?.value;
  const expected = getPortalSessionValue();

  if (!session || session.length !== expected.length) return false;

  return timingSafeEqual(Buffer.from(session), Buffer.from(expected));
}

export function portalCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}

export function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Unauthorized." },
    { status: 401 }
  );
}

export { PORTAL_COOKIE };
