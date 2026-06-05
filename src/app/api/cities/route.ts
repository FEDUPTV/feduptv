import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get("state");

  if (!state) {
    return NextResponse.json({ cities: [] });
  }

  const { data, error } = await supabaseAdmin
    .from("cities")
    .select("city")
    .eq("state", state)
    .order("city");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    cities: data ?? [],
  });
}
