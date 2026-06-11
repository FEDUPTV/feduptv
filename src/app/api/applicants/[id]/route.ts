import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { resend } from "../../../../lib/resend";
import { getStatusEmail } from "../../../../lib/emailTemplates";
import { isPortalAuthenticated, unauthorized } from "../../../../lib/portalAuth";

function toInt(value: unknown) {
  if (value === "" || value === undefined || value === null) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isPortalAuthenticated())) return unauthorized();

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
  if (!(await isPortalAuthenticated())) return unauthorized();

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

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

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
          "FEDUP Casting <casting@feduptv.com>",
        to: data.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    } catch (e) {
      console.error("Email failed", e);
    }
  }

  return NextResponse.json({ success: true, applicant: data });
}


export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isPortalAuthenticated())) return unauthorized();

  const { id } = await context.params;

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

  const urls = [
    ...(Array.isArray(applicant.photo_urls) ? applicant.photo_urls : []),
    ...(Array.isArray(applicant.video_urls) ? applicant.video_urls : []),
  ];

  const filesToDelete = urls
    .map((url: string) => {
      const marker = "/storage/v1/object/public/applicants/";
      const index = url.indexOf(marker);
      return index >= 0 ? url.slice(index + marker.length) : null;
    })
    .filter(Boolean) as string[];

  if (filesToDelete.length) {
    await supabaseAdmin.storage
      .from("applicants")
      .remove(filesToDelete);
  }

  const { error: deleteError } = await supabaseAdmin
    .from("applicants")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json(
      { success: false, error: deleteError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
