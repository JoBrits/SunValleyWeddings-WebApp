const nodemailer = require("nodemailer");
require("dotenv").config();

// Email sending route
const postRegisterEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "No email provided." });
  }

  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or use SMTP details for a different provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Register for Your Event",
      html: `
        <p>Dear Guest,</p>
        <p>You are invited to register for your event.</p>
        <p>Please click the link below to register:</p>
        <a href="http://localhost:3000/SignUp">Register Here</a>
        <p>Best regards,<br>Event Team</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Invitation email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = {
  postRegisterEmail,
};
