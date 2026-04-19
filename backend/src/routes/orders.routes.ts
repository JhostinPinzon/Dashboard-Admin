import { Router } from 'express';
import { getOrders, updateOrderStatus } from '../controllers/ordersController';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

router.get('/', isAdmin, getOrders);
router.patch('/:id/status', isAdmin, updateOrderStatus);

export default router;
