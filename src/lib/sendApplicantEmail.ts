import { resend } from "./resend";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendApplicantEmail(
  email: string,
  firstName: string
) {
  try {
    await resend.emails.send({
      from: "FEDUP <noreply@feduptv.com>",
      to: email,
      subject: "FEDUP Application Received",
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Thank You ${escapeHtml(firstName)}</h2>

          <p>
            Your FEDUP casting application has been received.
          </p>

          <p>
            Our production team will review your submission and contact you if selected for the next phase.
          </p>

          <p>
            Thank you for sharing your story with FEDUP.
          </p>

          <p>
            FEDUP Reality Series
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Email Error:", error);
  }
}
