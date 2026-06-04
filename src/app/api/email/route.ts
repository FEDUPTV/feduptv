import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.to || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: "Missing email fields" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        error: "RESEND_API_KEY is not configured yet.",
      });
    }

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "FED UP <onboarding@resend.dev>",
      to: body.to,
      subject: body.subject,
      html: `<div>${body.message}</div>`,
    });

    return NextResponse.json({ success: true, result });
  } catch {
    return NextResponse.json(
      { success: false, error: "Email failed" },
      { status: 500 }
    );
  }
}
