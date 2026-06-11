import { NextResponse } from "next/server";
import { isPortalAuthenticated } from "../../../../lib/portalAuth";

export async function GET() {
  return NextResponse.json({
    authenticated: await isPortalAuthenticated(),
  });
}
