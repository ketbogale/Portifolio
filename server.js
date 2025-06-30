const axios = require('axios');
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Contact form endpoint
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // 1. Validate email existence with Hunter.io
    const hunterApiKey = process.env.HUNTER_API_KEY;
    const validateUrl = `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${hunterApiKey}`;

    try {
        const response = await axios.get(validateUrl);
        // Hunter.io returns a "result" field: "deliverable", "undeliverable", "risky", "unknown"
        if (!response.data.data.result || response.data.data.result !== 'deliverable') {
            return res.status(400).json({ message: "Please enter a valid, existing email address." });
        }
    } catch (err) {
        console.error('Email validation error:', err);
        return res.status(500).json({ message: "Email validation failed. Please try again later." });
    }

    // 2. If valid, send the email as before
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send message. Please try again later." });
    }
});
// ...existing code...
// Fallback to index.html for SPA routing (optional)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
