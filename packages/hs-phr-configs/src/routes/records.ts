import { Router } from 'express';
import { mockHealthRecords } from '../data/records';

const router = Router();

// Endpoint to get all health records
router.get('/health', (req, res) => {
    console.log('[Mock API] GET /api/records/health');
    res.status(200).json(mockHealthRecords);
});

export default router;