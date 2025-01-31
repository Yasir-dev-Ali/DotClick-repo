import User from '../Models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';


// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ 1. Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User({ name, email, password });

        // 🔹 Hash Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        

        // 🔹 Generate JWT Token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Generated Token:", token); // 🔥 Debugging Line

        // 🔹 Send Verification Email
        const verifyUrl = `http://localhost:3000/api/auth/verify-email?token=${token}`;

        await sendEmail({
            email: user.email,
            subject: "Verify Your Email",
            message: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,

        });

        await user.save();
        res.status(201).json({ message: "Verification email sent. Please check your inbox." });

    } catch (error) {
        console.error(error); // 🔥 Debugging Line
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ 2. Login user with JWT authentication
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email first" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ 3. Verify Email
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        // Find user by emailToken
        const user = await User.findOne({ emailToken: token });
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        // Verify user
        user.isVerified = true;
        user.emailToken = null;
        await user.save();

        res.json({ message: 'Email verified successfully!' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ 4. Forgot Password - Send Reset Link
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Generate password reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset link to email
        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
        await sendEmail(email, 'Reset Password', `Click this link to reset password: ${resetUrl}`);

        res.json({ message: 'Reset link sent to your email!' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
