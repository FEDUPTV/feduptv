export function getStatusEmail(status: string, firstName: string) {
  switch (status) {
    case "Under Review":
      return {
        subject: "FED UP Application Under Review",
        html: `
        <div style="font-family:Arial;padding:40px;background:#111;color:#fff;">
          <h1 style="color:#facc15;">FED UP Reality Series</h1>
          <p>Hello ${firstName},</p>
          <p>Your application has advanced to the review stage.</p>
          <p>Our producers are currently reviewing your story and may contact you for additional information.</p>
          <p>Thank you for your patience.</p>
        </div>
        `,
      };

    case "Audition Scheduled":
      return {
        subject: "FED UP Audition Invitation",
        html: `
        <div style="font-family:Arial;padding:40px;background:#111;color:#fff;">
          <h1 style="color:#facc15;">FED UP Reality Series</h1>
          <p>Hello ${firstName},</p>
          <p>Congratulations. You have been selected to participate in the next phase of casting.</p>
          <p>A producer will contact you with audition details.</p>
        </div>
        `,
      };

    case "Selected":
      return {
        subject: "Congratulations From FED UP",
        html: `
        <div style="font-family:Arial;padding:40px;background:#111;color:#fff;">
          <h1 style="color:#facc15;">FED UP Reality Series</h1>
          <p>Hello ${firstName},</p>
          <p>Congratulations. You have been selected to continue moving forward in the FED UP casting process.</p>
          <p>A producer will contact you shortly.</p>
        </div>
        `,
      };

    case "Rejected":
      return {
        subject: "FED UP Casting Update",
        html: `
        <div style="font-family:Arial;padding:40px;background:#111;color:#fff;">
          <h1 style="color:#facc15;">FED UP Reality Series</h1>
          <p>Hello ${firstName},</p>
          <p>Thank you for sharing your story with us.</p>
          <p>At this time we will not be moving forward, however we truly appreciate your interest in FED UP.</p>
        </div>
        `,
      };

    default:
      return null;
  }
}
