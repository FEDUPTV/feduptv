import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";
import { env } from "../../../lib/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.to || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: "Missing email fields" },
        { status: 400 }
      );
    }

    if (!env.resendApiKey) {
      return NextResponse.json({
        success: false,
        error: "RESEND_API_KEY is not configured yet.",
      });
    }

    const result = await resend.emails.send({
      from: env.resendFromEmail,
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
