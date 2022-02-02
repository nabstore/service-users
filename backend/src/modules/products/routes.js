import express from 'express';
import productsActions from './actions';

const router = express.Router();

router.get('/products', productsActions.index);
router.post('/products', productsActions.create);
router.get('/products/:id', productsActions.read);
router.patch('/products/:id', productsActions.update);
router.delete('/products/:id', productsActions.del);

export default router;