import { resend } from "./resend";

export async function sendCastingNotification(
  applicant: any
) {
  try {
    const result = await resend.emails.send({
      from: "FEDUP <noreply@feduptv.com>",
      to: "casting@feduptv.com",
      subject: `New FEDUP Application - ${applicant.first_name} ${applicant.last_name}`,
      html: `
        <h2>New Applicant Submitted</h2>

        <p><strong>Name:</strong> ${applicant.first_name} ${applicant.last_name}</p>
        <p><strong>Email:</strong> ${applicant.email}</p>
        <p><strong>Phone:</strong> ${applicant.phone}</p>
        <p><strong>Instagram:</strong> ${applicant.instagram || "-"}</p>
        <p><strong>TikTok:</strong> ${applicant.tiktok || "-"}</p>
        <p><strong>Facebook:</strong> ${applicant.facebook || "-"}</p>

        <hr>

        <p><strong>Story Preview:</strong></p>

        <p>
          ${(applicant.fed_up_story || "").substring(0,500)}
        </p>

        <hr>

        <p>
          Submitted:
          ${new Date().toLocaleString()}
        </p>
      `,
    });

    console.log('EMAIL RESULT:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
}
