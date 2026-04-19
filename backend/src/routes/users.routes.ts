import { Router } from 'express';
import { getUsers } from '../controllers/usersController';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

router.get('/', isAdmin, getUsers);

export default router;
