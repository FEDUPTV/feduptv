import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { isPortalAuthenticated, unauthorized } from "../../../lib/portalAuth";

export async function GET() {
  if (!(await isPortalAuthenticated())) return unauthorized();

  const { data, error } = await supabaseAdmin
    .from("applicants")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return NextResponse.json({
      applicants: [],
      error: error.message,
    });
  }

  return NextResponse.json({
    applicants: data,
  });
}
