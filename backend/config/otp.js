const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');

module.exports = {
    generateOTP: () => {
        return randomstring.generate({
            length: 6,
            charset: 'numeric',
        });
    },

    sendOTPEmail: async (email, otp) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'OTP for Sign-up',
            text: `Your OTP for sign-up is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);
    },

    generateVerificationToken: (email) => {
        return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    },

    sendVerificationEmail: async (email, token) => {
        const verificationLink = `http://localhost:3000/verify?token=${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'Email Verification',
            text: `Click the following link to verify your email: ${verificationLink}`,
        };

        await transporter.sendMail(mailOptions);
    }
};
