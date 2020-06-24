import express from 'express';
import { authorizationHandler } from '../utils/authorizationHandler';
import {
  getAllDirectorieConfigs,
  getOneDirectoryConfig,
  newDirectoryConfig,
  updateDirectoryConfig
} from '../controllers/DirectoryConfig';

const router = express.Router();

router.get('/directory/config/all', [authorizationHandler, getAllDirectorieConfigs]);
router.get('/directory/config/:directoryConfigId', [authorizationHandler, getOneDirectoryConfig]);
router.post('/directory/config/new', [authorizationHandler, newDirectoryConfig]);
router.put('/directory/config/:directoryConfigId', [authorizationHandler, updateDirectoryConfig]);

export default router;
