import express from 'express';
import comprassActions from './actions';

const router = express.Router();

router.post('/compras', comprassActions.create);

export default router;