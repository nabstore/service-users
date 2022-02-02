import express from 'express';
import usersActions from './actions';

const router = express.Router();

router.get('/users', usersActions.index);
router.post('/users', usersActions.create);
router.get('/users/:id', usersActions.read);
router.patch('/users/:id', usersActions.update);
router.delete('/users/:id', usersActions.del);

export default router;