import { resend } from "./resend";

type CastingNotificationApplicant = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  fed_up_story?: string;
};

function escapeHtml(value: string | undefined) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendCastingNotification(
  applicant: CastingNotificationApplicant
) {
  try {
    const firstName = escapeHtml(applicant.first_name);
    const lastName = escapeHtml(applicant.last_name);
    const storyPreview = escapeHtml(applicant.fed_up_story).substring(0, 500);

    await resend.emails.send({
      from: "FEDUP <noreply@feduptv.com>",
      to: "casting@feduptv.com",
      subject: `New FEDUP Application - ${firstName} ${lastName}`,
      html: `
        <h2>New Applicant Submitted</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${escapeHtml(applicant.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(applicant.phone)}</p>
        <p><strong>Instagram:</strong> ${escapeHtml(applicant.instagram) || "-"}</p>
        <p><strong>TikTok:</strong> ${escapeHtml(applicant.tiktok) || "-"}</p>
        <p><strong>Facebook:</strong> ${escapeHtml(applicant.facebook) || "-"}</p>

        <hr>

        <p><strong>Story Preview:</strong></p>

        <p>
          ${storyPreview}
        </p>

        <hr>

        <p>
          Submitted:
          ${new Date().toLocaleString()}
        </p>
      `,
    });
  } catch (error) {
    console.error(error);
  }
}
