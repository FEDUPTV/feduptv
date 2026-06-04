import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin.storage
    .from("applicant-uploads")
    .list();

  return NextResponse.json({
    success: !error,
    error: error?.message ?? null,
    data,
  });
}
