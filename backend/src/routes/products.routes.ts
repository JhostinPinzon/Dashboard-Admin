import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productsController';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

router.get('/', isAdmin, getProducts);
router.get('/:id', isAdmin, getProductById);
router.post('/', isAdmin, createProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

export default router;
