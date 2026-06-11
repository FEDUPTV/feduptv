import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { isPortalAuthenticated, unauthorized } from "../../../../lib/portalAuth";

export async function GET() {
  if (!(await isPortalAuthenticated())) return unauthorized();

  const { data, error } = await supabaseAdmin
    .from("applicants")
    .select("status, producer_one_rating, producer_two_rating, producer_three_rating");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = data || [];

  const allScores = rows.map((row) => {
    return (
      Number(row.producer_one_rating || 0) +
      Number(row.producer_two_rating || 0) +
      Number(row.producer_three_rating || 0)
    ) / 3;
  });

  const average =
    allScores.length > 0
      ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1)
      : "0.0";

  return NextResponse.json({
    total: rows.length,
    new: rows.filter((x) => x.status === "New").length,
    review: rows.filter((x) => x.status === "Under Review").length,
    auditions: rows.filter((x) => x.status === "Audition Scheduled").length,
    selected: rows.filter((x) => x.status === "Selected").length,
    rejected: rows.filter((x) => x.status === "Rejected").length,
    averageScore: average,
  });
}
