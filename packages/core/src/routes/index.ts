import express from 'express';
import { newDirectory } from '../controllers/directory';
import { allUser } from '../controllers/user';

const router = express.Router();

router.post('/directory/new', newDirectory);
router.get('/user', allUser);

export default router;
