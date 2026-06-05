import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { resend } from "../../../../lib/resend";
import { getStatusEmail } from "../../../../lib/emailTemplates";

function toInt(value: unknown) {
  if (value === "" || value === undefined || value === null) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data, error } = await supabaseAdmin
    .from("applicants")
    .select("*")
    .eq("id", id)
    .single();


  if (error) {

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, applicant: data });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("applicants")
    .update({
      status: body.status,
      producer_notes: body.producer_notes,
      casting_score: toInt(body.casting_score),
    })
    .eq("id", id)
    .select()
    .single();


  const emailTemplate = getStatusEmail(
    body.status,
    data.first_name || "Candidate"
  );

  if (
    emailTemplate &&
    data.email &&
    process.env.RESEND_API_KEY
  ) {
    try {
      await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          "FEDUP <onboarding@resend.dev>",
        to: data.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } catch (e) {
      console.error("Email failed", e);
    }
  }

  if (error) {

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, applicant: data });
}
