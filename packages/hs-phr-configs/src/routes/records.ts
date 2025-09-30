import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { HealthRecord, mockHealthRecords } from '../data/records';

const router = Router();

// Endpoint to get all health records
router.get('/health', (req, res) => {
    console.log('[Mock API] GET /api/records/health');
    res.status(200).json(mockHealthRecords);
});

// NEW: Endpoint to add a new record
router.post('/health', (req, res) => {
    const newRecordData = req.body;
    console.log('[Mock API] POST /api/records/health', newRecordData);

    const newRecord: HealthRecord = {
        id: uuidv4(),
        ...newRecordData,
        date: new Date().toISOString(), // Assign current date
        year: new Date().getFullYear().toString(),
    };

    mockHealthRecords.unshift(newRecord); // Add to the top of the list
    res.status(201).json(newRecord);
});

export default router;