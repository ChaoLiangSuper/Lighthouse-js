import express from 'express';
import { errorHandler } from '../utils/errorHandler';
import DirectoryConfigRouter from './DirectoryConfig';
import RecordDataRouter from './RecordData';
import UserRouter from './User';

const router = express.Router();

router.use('/', DirectoryConfigRouter);
router.use('/', RecordDataRouter);
router.use('/', UserRouter);
router.use(errorHandler);

export default router;
