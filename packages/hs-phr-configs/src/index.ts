import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import configRoutes from './routes/config';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: 'http://localhost:4000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Main Routes
app.use('/api/config', configRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 [hs-phr-configs]: Server running at http://localhost:${PORT}`);
});


