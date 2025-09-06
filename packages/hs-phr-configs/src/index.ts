import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import configRoutes from './routes/config';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Main Routes
app.use('/api/config', configRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 [hs-phr-configs]: Server running at http://localhost:${PORT}`);
});
