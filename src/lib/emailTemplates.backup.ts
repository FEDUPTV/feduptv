const LOGO =
  "https://feduptv.com/images/logo.png";

const INSTAGRAM =
  "https://www.instagram.com/fedddup_";

const FACEBOOK =
  "https://www.facebook.com/FedUpRealitySeries";

const YOUTUBE =
  "https://www.youtube.com/@FedUpRealitySeries";

function buildEmail({
  firstName,
  title,
  milestone,
  message,
}: {
  firstName: string;
  title: string;
  milestone: string;
  message: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
      <tr>
        <td align="center">

          <table width="650" cellpadding="0" cellspacing="0" style="max-width:650px;background:#111111;border:1px solid #222;border-radius:18px;overflow:hidden;">

            <tr>
              <td align="center" style="padding:40px 30px 25px;">

                <img
                  src="${LOGO}"
                  alt="FEDUP"
                  width="90"
                  style="display:block;margin-bottom:20px;"
                />

                <h1 style="margin:0;color:#facc15;font-size:42px;font-weight:900;">
                  FEDUP
                </h1>

                <p style="color:#bfbfbf;margin-top:10px;">
                  Females Ending Defeat. Unleashing Purpose.
                </p>

              </td>
            </tr>

            <tr>
              <td style="height:4px;background:#facc15;"></td>
            </tr>

            <tr>
              <td style="padding:40px;">

                <div style="
                  background:#181818;
                  border-left:4px solid #facc15;
                  padding:20px;
                  border-radius:10px;
                  margin-bottom:35px;
                ">
                  <strong style="color:#facc15;">
                    Casting Milestone:
                  </strong>
                  <br><br>
                  ${milestone}
                </div>

                <h2 style="
                  margin-top:0;
                  color:#facc15;
                  font-size:38px;
                  font-weight:900;
                ">
                  ${title}
                </h2>

                <p style="font-size:18px;line-height:1.8;">
                  Hello ${firstName},
                </p>

                <div style="
                  font-size:18px;
                  line-height:1.9;
                  color:#e5e5e5;
                ">
                  ${message}
                </div>

                <div style="
                  margin-top:35px;
                  padding:24px;
                  background:#181818;
                  border-radius:12px;
                ">
                  <strong style="color:#facc15;">
                    Questions?
                  </strong>

                  <p style="margin-top:12px;color:#d4d4d4;">
                    Simply reply to this email and a member of our casting team will assist you.
                  </p>
                </div>

                <div style="
                  margin-top:35px;
                  padding:24px;
                  background:#181818;
                  border-radius:12px;
                  text-align:center;
                ">
                  <h3 style="
                    margin-top:0;
                    color:#facc15;
                  ">
                    Follow FEDUP
                  </h3>

                  <a href="${INSTAGRAM}" style="margin:0 10px;text-decoration:none;font-size:28px;">📸</a>

                  <a href="${FACEBOOK}" style="margin:0 10px;text-decoration:none;font-size:28px;">📘</a>

                  <a href="${YOUTUBE}" style="margin:0 10px;text-decoration:none;font-size:28px;">▶️</a>

                </div>

              </td>
            </tr>

            <tr>
              <td align="center" style="
                padding:30px;
                background:#0d0d0d;
                color:#888;
                font-size:13px;
              ">
                FEDUP Reality Series<br>
                Females Ending Defeat. Unleashing Purpose.<br><br>
                www.feduptv.com
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}

export function getStatusEmail(
  status: string,
  firstName: string
) {
  switch (status) {
    case "Under Review":
      return {
        subject: "FEDUP Application Under Review",
        html: buildEmail({
          firstName,
          title: "Application Under Review",
          milestone:
            "✓ Application Submitted → ✓ Producer Review",
          message: `
            <p>
              Your application has successfully advanced to the producer review stage.
            </p>

            <p>
              Our casting team is currently reviewing your story, background, and overall application.
            </p>

            <p>
              If selected, you may receive an invitation to continue to the next phase of casting.
            </p>
          `,
        }),
      };

    case "Audition Scheduled":
      return {
        subject: "You Have Been Invited To Audition",
        html: buildEmail({
          firstName,
          title: "Audition Invitation",
          milestone:
            "✓ Application Submitted → ✓ Producer Review → ➜ Audition Invitation",
          message: `
            <p>
              Congratulations.
            </p>

            <p>
              Your story stood out to our casting team and you have been selected to move forward in the FEDUP casting process.
            </p>

            <p>
              A producer will contact you with complete audition details and next steps.
            </p>

            <p>
              This is a major milestone in the selection process.
            </p>
          `,
        }),
      };

    case "Selected":
      return {
        subject: "Congratulations From FEDUP",
        html: buildEmail({
          firstName,
          title: "You're Moving Forward",
          milestone:
            "✓ Application Submitted → ✓ Producer Review → ✓ Audition → ✓ Selected",
          message: `
            <p>
              Congratulations.
            </p>

            <p>
              You have officially been selected to continue moving forward in the FEDUP casting process.
            </p>

            <p>
              Our production team will be reaching out with additional information and next steps.
            </p>
          `,
        }),
      };

    case "Rejected":
      return {
        subject: "FEDUP Casting Update",
        html: buildEmail({
          firstName,
          title: "Casting Update",
          milestone:
            "✓ Application Reviewed",
          message: `
            <p>
              Thank you for sharing your story with FEDUP.
            </p>

            <p>
              While we will not be moving forward at this time, we sincerely appreciate your interest in the series.
            </p>

            <p>
              We wish you continued success and thank you for allowing us to learn about your journey.
            </p>
          `,
        }),
      };

    default:
      return null;
  }
}
