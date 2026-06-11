import { NextResponse } from "next/server";
import { resend } from "../../../lib/resend";
import { isPortalAuthenticated, unauthorized } from "../../../lib/portalAuth";

export async function GET() {
  if (!(await isPortalAuthenticated())) return unauthorized();

  try {
    const result = await resend.emails.send({
      from: "FEDUP <noreply@feduptv.com>",
      to: "visionstampabay@gmail.com",
      subject: "FEDUP Email System Test",
      html: `
        <div style="font-family:Arial,sans-serif">
          <h1>FEDUP Email Test</h1>
          <p>If you're reading this, Resend is working correctly.</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      id: result.data?.id,
    });
  } catch (error) {
    console.error("RESEND ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Email test failed.",
      },
      { status: 500 }
    );
  }
}
