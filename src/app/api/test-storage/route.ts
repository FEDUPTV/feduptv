import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { isPortalAuthenticated, unauthorized } from "../../../lib/portalAuth";

export async function GET() {
  if (!(await isPortalAuthenticated())) return unauthorized();

  const { data, error } = await supabaseAdmin.storage
    .from("applicant-uploads")
    .list();

  return NextResponse.json({
    success: !error,
    error: error?.message ?? null,
    data,
  });
}
