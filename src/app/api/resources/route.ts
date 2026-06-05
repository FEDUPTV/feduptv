import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const state = searchParams.get("state");
  const county = searchParams.get("county");
  const category = searchParams.get("category");

  let query = supabaseAdmin
    .from("resources")
    .select("*")
    .eq("active", true)
    .order("state", { ascending: true })
    .order("county", { ascending: true })
    .order("category", { ascending: true });

  if (state) query = query.eq("state", state);
  if (county) query = query.eq("county", county);
  if (category) query = query.eq("category", category);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { resources: [], error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    resources: data || [],
  });
}
