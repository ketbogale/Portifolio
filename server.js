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

    // Set up your email transporter (use your real credentials in production)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ket1boggood@gmail.com',      // replace with your email
            pass: 'your_app_password'          // replace with your app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'ket1boggood@gmail.com',           // your receiving email
        subject: `Portfolio Contact from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

// Fallback to index.html for SPA routing (optional)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
