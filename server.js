const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "diyagopal22@gmail.com", // your Gmail
        pass: "Diya@212221", // from Google App Passwords
      },
    });

    await transporter.sendMail({
      from: email,
      to: "your_email@gmail.com",
      subject: subject,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
