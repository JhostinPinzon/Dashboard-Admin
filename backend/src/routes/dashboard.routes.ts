import { Router } from 'express';
import { getMetrics } from '../controllers/dashboardController';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

router.get('/metrics', isAdmin, getMetrics);

export default router;
