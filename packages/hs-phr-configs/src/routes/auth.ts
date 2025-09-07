import { Router } from 'express';
import { mockUser } from '../data/auth';

const router = Router();

// This endpoint simulates fetching the current user
router.get('/me', (req, res) => {
    console.log('Mock API: /api/auth/me called');
    res.status(200).json(mockUser);
});

// NEW: This endpoint simulates a login attempt
router.post('/login', (req, res) => {
    const { phone, password } = req.body;
    console.log(`Mock API: Login attempt for phone: ${phone}`);

    // In a real backend, you would look up the user and check a hashed password.
    // Here, we just check against our mock user's credentials.
    if (phone === mockUser.phone && password === mockUser.password) {
        // Return the user data on success (without the password)
        const { password: _, ...userWithoutPassword } = mockUser;
        return res.status(200).json(userWithoutPassword);
    }

    // Return an error for invalid credentials
    return res.status(401).json({ message: 'Invalid phone number or password' });
});

export default router;