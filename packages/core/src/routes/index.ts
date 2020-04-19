import express from 'express';
import { newCollection } from '../controllers/collection';

const router = express.Router();

router.post('/collection/new', newCollection);

export default router;
