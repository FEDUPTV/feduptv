import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

console.log(
  "SERVICE KEY EXISTS:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("applicants")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  console.log("APPLICANTS DATA:", data);
  console.log("APPLICANTS ERROR:", error);

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