import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabase-admin";
import { isPortalAuthenticated, unauthorized } from "../../../../../lib/portalAuth";
import { getApplicantDisplayAge } from "../../../../../lib/applicantAge";

function withComputedAge<T extends { age?: unknown; birthdate?: unknown }>(
  applicant: T
) {
  return {
    ...applicant,
    age: getApplicantDisplayAge(applicant.age, applicant.birthdate),
  };
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isPortalAuthenticated())) return unauthorized();

  const { id } = await context.params;
  const body = await request.json();

  const reason = body.reason || "No reason provided.";

  const { data: applicant, error: fetchError } = await supabaseAdmin
    .from("applicants")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !applicant) {
    return NextResponse.json(
      { success: false, error: fetchError?.message || "Applicant not found." },
      { status: 404 }
    );
  }

  const cleanEmail = String(applicant.email || "").trim().toLowerCase();
  const cleanPhone = String(applicant.phone || "").replace(/\D/g, "");

  await supabaseAdmin
    .from("banned_applicants")
    .insert([
      {
        email: cleanEmail,
        phone: cleanPhone,
        reason,
      },
    ]);

  const { data, error } = await supabaseAdmin
    .from("applicants")
    .update({
      banned: true,
      banned_reason: reason,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, applicant: withComputedAge(data) });
}
