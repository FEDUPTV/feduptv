import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function GET() {
  const { data } = await supabaseAdmin
    .from("resources")
    .select("state")
    .order("state");

  const states = [...new Set((data || []).map((r:any) => r.state))];

  return NextResponse.json({ states });
}
