import { Router } from 'express';
import { mockUser } from '../data/auth';

const router = Router();

router.get('/me', (req, res) => {
    console.log('Mock API: /api/auth/me called');
    res.status(200).json(mockUser);
});

// Updated to handle both email and phone login
router.post('/login', (req, res) => {
    const { phone, email, password, loginMethod } = req.body;
    console.log(`Mock API: Login attempt with ${loginMethod}`, req.body);

    const isPasswordMatch = password && password === mockUser.password;
    let isUserMatch = false;

    if (loginMethod === 'mobile') {
        isUserMatch = phone && phone === mockUser.phone;
    } else if (loginMethod === 'email') {
        isUserMatch = email && email === mockUser.email;
    }

    if (isUserMatch && isPasswordMatch) {
        const { password: _, ...userWithoutPassword } = mockUser;
        return res.status(200).json(userWithoutPassword);
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

export default router;