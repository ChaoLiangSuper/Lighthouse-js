import express from 'express';
import { authorizationHandler } from '../utils/authorizationHandler';
import { getAllRecordData, getOneRecordData, addRecordData, updateRecordData } from '../controllers/RecordData';

const router = express.Router();

router.get('/directory/:directoryConfigId/record/all', [authorizationHandler, getAllRecordData]);
router.get('/directory/:directoryConfigId/record/:recordDataId', [authorizationHandler, getOneRecordData]);
router.post('/directory/:directoryConfigId/record/new', [authorizationHandler, addRecordData]);
router.put('/directory/:directoryConfigId/record/:recordDataId', [authorizationHandler, updateRecordData]);

export default router;
