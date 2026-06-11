import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { isPortalAuthenticated, unauthorized } from "../../../../lib/portalAuth";

export async function GET() {
  if (!(await isPortalAuthenticated())) return unauthorized();

  const { data, error } = await supabaseAdmin
    .from("applicants")
    .select("status");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = data || [];

  return NextResponse.json({
    total: rows.length,
    new: rows.filter((x) => x.status === "New").length,
    review: rows.filter((x) => x.status === "Under Review").length,
    auditions: rows.filter((x) => x.status === "Audition Scheduled").length,
    selected: rows.filter((x) => x.status === "Selected").length,
    rejected: rows.filter((x) => x.status === "Rejected").length,
  });
}
