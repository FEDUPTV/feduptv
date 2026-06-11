import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

type ResourceState = {
  state: string | null;
};

export async function GET() {
  const { data } = await supabaseAdmin
    .from("resources")
    .select("state")
    .order("state");

  const states = [
    ...new Set(
      ((data || []) as ResourceState[])
        .map((resource) => resource.state)
        .filter(Boolean)
    ),
  ];

  return NextResponse.json({ states });
}
