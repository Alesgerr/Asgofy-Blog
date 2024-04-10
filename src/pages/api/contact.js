// pages/api/contact.js

const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    // E-posta gönderme işlemi
    try {
      const transporter = nodemailer.createTransport({
        // E-posta gönderim ayarlarını buraya girin
        service: "gmail",
        auth: {
          user: "asgorise@gmail.com", // Gmail adresiniz
          pass: "password", // Gmail şifreniz
        },
      });

      const mailOptions = {
        from: `${name} <${email}>`,
        to: "asgorise@gmail.com", // E-posta alıcısının adresi
        subject: subject,
        text: message,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).end();
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).end();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
