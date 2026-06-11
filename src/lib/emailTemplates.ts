const LOGO =
  "https://feduptv.com/images/fedup_logo.png";

const INSTAGRAM =
  "https://www.instagram.com/fedddup_";

const FACEBOOK =
  "https://www.facebook.com/FedUpRealitySeries";

const YOUTUBE =
  "https://www.youtube.com/@FedUpRealitySeries";

function buildEmail({
  firstName,
  title,
  progress,
  message,
  nextSteps,
}: {
  firstName: string;
  title: string;
  progress: number;
  message: string;
  nextSteps: string;
}) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:15px 8px;">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111111;border:1px solid #222;border-radius:18px;overflow:hidden;">

<tr>
<td align="center" style="padding:20px 15px;">

<img
src="${LOGO}"
alt="FEDUP"
width="45"
style="display:block;margin-bottom:20px;"
/>

<h1 style="margin:0;color:#facc15;font-size:26px;font-weight:900;">
FEDUP
</h1>

<p style="color:#bfbfbf;margin-top:10px;">
Females Ending Defeat. Unleashing Purpose.
</p>

</td>
</tr>

<tr>
<td
align="center"
style="
background:#facc15;
color:#000;
font-weight:900;
letter-spacing:1px;
text-transform:uppercase;
padding:8px;
"
>
Official Casting Communication
</td>
</tr>

<tr>
<td style="padding:14px;">

<h2
style="
margin-top:0;
color:#facc15;
font-size:24px;
font-weight:900;
"
>
${title}
</h2>

<p style="font-size:16px;">
Hello ${firstName},
</p>

<div
style="
background:#181818;
border-left:4px solid #facc15;
padding:14px;
border-radius:10px;
margin-bottom:12px;
"
>
<strong style="color:#facc15;">
Casting Progress
</strong>

<div style="margin-top:20px;">

<div style="color:#999;font-size:13px;line-height:1.8;margin-bottom:8px;">
✓ Application &nbsp;&nbsp; • &nbsp;&nbsp; ✓ Review &nbsp;&nbsp; • &nbsp;&nbsp; ✓ Audition &nbsp;&nbsp; • &nbsp;&nbsp; ★ Selected
</div>

<div
style="
height:10px;
background:#222;
border-radius:999px;
overflow:hidden;
"
>
<div
style="
width:${progress}%;
height:10px;
background:#facc15;
"
></div>
</div>

</div>

</div>

<div
style="
font-size:16px;
line-height:1.9;
color:#e5e5e5;
"
>
${message}
</div>

<div style="text-align:center;margin-top:18px;">
<a
href="https://feduptv.com"
style="
background:#facc15;
color:#000;
padding:10px 18px;
border-radius:999px;
text-decoration:none;
font-weight:900;
display:inline-block;
"
>
Visit FEDUP
</a>
</div>

<div
style="
margin-top:18px;
padding:8px;
background:#181818;
border-radius:12px;
"
>
<h3 style="margin-top:0;color:#facc15;">
Your Casting Journey
</h3>

${nextSteps}
</div>

<div
style="
margin-top:18px;
padding:8px;
background:#181818;
border-radius:12px;
"
>
<strong style="color:#facc15;">
FEDUP Casting Team
</strong>

<p style="color:#d4d4d4;">
Thank you for sharing your story.
Every application is personally reviewed by our production team.
</p>
</div>

<div
style="
margin-top:18px;
padding:8px;
background:#181818;
border-radius:12px;
"
>
<strong style="color:#facc15;">
Questions?
</strong>

<p style="margin-top:12px;color:#d4d4d4;">
Simply reply to this email and a member of our casting team will assist you.
</p>
</div>

<div
style="
margin-top:18px;
padding:8px;
background:#181818;
border-radius:12px;
text-align:center;
"
>

<h3 style="margin-top:0;color:#facc15;">
Follow FEDUP
</h3>

<p style="color:#d4d4d4;">
Follow the journey and stay connected with FEDUP.
</p>

<a href="${INSTAGRAM}" style="margin:0 8px;">
<img src="https://feduptv.com/images/email/instagram.png" width="36" alt="Instagram">
</a>

<a href="${FACEBOOK}" style="margin:0 8px;">
<img src="https://feduptv.com/images/email/facebook.png" width="36" alt="Facebook">
</a>

<a href="${YOUTUBE}" style="margin:0 8px;">
<img src="https://feduptv.com/images/email/youtube.png" width="36" alt="YouTube">
</a>

</div>

</td>
</tr>

<tr>
<td
align="center"
style="
padding:18px;
background:#0d0d0d;
color:#888;
font-size:12px;
"
>
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
          progress: 50,
          message: `
            <p>Your application has successfully advanced to the producer review stage.</p>
            <p>Our casting team is currently reviewing your story and background.</p>
            <p>If selected, you may receive an invitation to continue to the next phase.</p>
          `,
          nextSteps: `
            <ul>
              <li>Producer Review</li>
              <li>Candidate Evaluation</li>
              <li>Audition Consideration</li>
            </ul>
          `,
        }),
      };

    case "Audition Scheduled":
      return {
        subject: "You Have Been Invited To Audition",
        html: buildEmail({
          firstName,
          title: "Audition Invitation",
          progress: 75,
          message: `
            <p>Congratulations.</p>
            <p>Your story stood out to our casting team.</p>
            <p>You have been selected to move forward in the FEDUP casting process.</p>
            <p>A producer will contact you with complete audition details.</p>
          `,
          nextSteps: `
            <ul>
              <li>Your producer will contact you shortly.</li>
              <li>Audition Interview</li>
              <li>Final Review</li>
            </ul>
          `,
        }),
      };

    case "Selected":
      return {
        subject: "Congratulations From FEDUP",
        html: buildEmail({
          firstName,
          title: "You're Moving Forward",
          progress: 100,
          message: `
            <p>Congratulations.</p>
            <p>You have officially been selected to continue moving forward.</p>
            <p>Our production team will be reaching out with next steps.</p>
          `,
          nextSteps: `
            <ul>
              <li>You are among a limited group advancing.</li>
              <li>Scheduling</li>
              <li>Show Preparation</li>
            </ul>
          `,
        }),
      };

    case "Rejected":
      return {
        subject: "FEDUP Casting Update",
        html: buildEmail({
          firstName,
          title: "Casting Update",
          progress: 50,
          message: `
            <p>Thank you for sharing your story with FEDUP.</p>
            <p>While we will not be moving forward at this time, we sincerely appreciate your interest.</p>
            <p>We wish you continued success and thank you for allowing us to learn about your journey.</p>
          `,
          nextSteps: `
            <ul>
              <li>We appreciate the opportunity to learn about your story.</li>
              <li>Future casting opportunities may become available.</li>
            </ul>
          `,
        }),
      };

    default:
      return null;
  }
}
