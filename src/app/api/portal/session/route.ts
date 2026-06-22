import { NextResponse } from "next/server";
import {
  isPortalAuthenticated,
  isPortalDisabled,
} from "../../../../lib/portalAuth";

export async function GET() {
  return NextResponse.json({
    disabled: isPortalDisabled(),
    authenticated: await isPortalAuthenticated(),
  });
}
