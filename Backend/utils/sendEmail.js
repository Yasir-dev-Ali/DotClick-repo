import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true", // Use TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate errors
    },
});

 const sendEmail = async ({ email, subject, message }) => {
    try {
        await transporter.sendMail({
            from: `"Your App Name" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            html: message,
        });
        console.log("📧 Email sent successfully to:", email);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
    }
};

export default sendEmail;