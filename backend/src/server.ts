// src/server.ts - Express Server Inicial
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware básico
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend Dashboard-Admin v1.0' });
});

import authRoutes from './routes/auth.routes';
app.use('/api/auth', authRoutes);


// Routes adicionales vendrán aquí

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});


