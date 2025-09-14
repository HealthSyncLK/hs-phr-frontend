import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const AUTH_COOKIE_NAME = 'auth_token'; // Should match your Next.js env variable

// Mock user data
const mockUser = {
    id: "0ae19a17-1e2e-47db-9c85-79e4d02c35a3",
    username: "madushansachintha@gmail.com"
};

// Step 1 (Option A): Traditional username/password login
// This endpoint accepts a username and password and initiates the OTP flow.
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`[Mock API] Step 1: Login attempt for username: ${username}`);

    res.status(200).json({
        success: true,
        session_id: uuidv4(),
        method: "email",
        message: "Verification code sent to your email address"
    });
});

// Step 1: Verify contact and return a session ID
router.post('/verify-contact', (req, res) => {
    const { contact, type } = req.body;
    console.log(`[Mock API] Contact verification for ${type}: ${contact}`);
    res.status(200).json({
        success: true,
        session_id: uuidv4(),
        method: type,
        message: `Verification code sent to your ${type}.`,
    });
});

// Step 2: Verify OTP and set the httpOnly cookie
router.post('/verify-login-otp', (req, res) => {
    const { otp, session_id } = req.body;
    console.log(`[Mock API] OTP verification for session ${session_id}`);

    if (otp === "123456" && session_id) {
        // Set the secure cookie on the response
        res.cookie(AUTH_COOKIE_NAME, 'mock-secure-jwt-for-development', {
            httpOnly: true,
            secure: false, // For production, this MUST be true (HTTPS only)
            sameSite: 'lax', // 'lax' is best for cross-domain auth
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: mockUser
        });
    } else {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
});

// A protected route to get the current user's info
router.get('/me', (req, res) => {
    const token = req.cookies[AUTH_COOKIE_NAME];
    if (token === 'mock-secure-jwt-for-development') {
        return res.status(200).json(mockUser);
    }
    return res.status(401).json({ message: 'Not authenticated' });
});

export default router;