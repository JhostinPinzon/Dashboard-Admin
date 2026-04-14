// src/routes/index.ts - Placeholder
import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => res.json({ api: 'v1', status: 'ready' }));
export default router;

