const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendBudgetAlertEmail(email, name, spent, limit) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "⚠ WalletWatch Budget Alert!",
        html: `
            <h2>Hello ${name},</h2>
            <p>You have exceeded your monthly budget of <strong>₹${limit}</strong>.</p>
            <p>Your current spending is <strong>₹${spent}</strong>.</p>
            <p>Be mindful of your expenses for better savings!</p>
            <br/><strong>— WalletWatch Team</strong>
        `
    });
}

module.exports = { sendBudgetAlertEmail };
