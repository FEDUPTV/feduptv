import { resend } from "./resend";

export async function sendApplicantEmail(
  email: string,
  firstName: string
) {
  try {
    const result = await resend.emails.send({
      from: "FEDUP <noreply@feduptv.com>",
      to: email,
      subject: "FEDUP Application Received",
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Thank You ${firstName}</h2>

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

    console.log('EMAIL RESULT:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Email Error:", error);
  }
}
