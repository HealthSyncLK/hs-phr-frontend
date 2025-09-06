import { Router } from 'express';
import { mockUser } from '../data/auth';

const router = Router();

// This endpoint simulates fetching the current user
router.get('/me', (req, res) => {
    console.log('Mock API: /api/auth/me called');
    res.status(200).json(mockUser);
});

export default router;
