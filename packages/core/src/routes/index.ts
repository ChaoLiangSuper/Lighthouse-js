import express from 'express';
import { errorHandler } from '../utils/errorHandler';
import { authorizationHandler } from '../utils/authorizationHandler';
import { login, logout } from '../controllers/login';
import { getAllDirectories, getOneDirectory, newDirectory, updateDirectory } from '../controllers/directory';
import { getAllRecords, getOneRecord, newRecord, updateRecord } from '../controllers/record';
import { getAllUsers } from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.get('/logout', [authorizationHandler, logout]);

// Directory controller
router.get('/directory/config/all', [authorizationHandler, getAllDirectories]);
router.get('/directory/config/:directoryId', [authorizationHandler, getOneDirectory]);
router.post('/directory/config/new', [authorizationHandler, newDirectory]);
router.put('/directory/config/:directoryId', [authorizationHandler, updateDirectory]);

// Record controller
router.get('/directory/:directoryId/record/all', [authorizationHandler, getAllRecords]);
router.get('/directory/:directoryId/record/:recordId', [authorizationHandler, getOneRecord]);
router.post('/directory/:directoryId/record/new', [authorizationHandler, newRecord]);
router.put('/directory/:directoryId/record/:recordId', [authorizationHandler, updateRecord]);

// User controller
router.get('/user/all', [authorizationHandler, getAllUsers]);

router.use(errorHandler);

export default router;
