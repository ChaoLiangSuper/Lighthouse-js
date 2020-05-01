import express from 'express';
import { login, logout } from '../controllers/login';
import { errorHandler } from '../utils/errorHandler';
import { authorizationHandler } from '../utils/authorizationHandler';

const router = express.Router();

router.post('/login', login);
router.get('/logout', [authorizationHandler, logout]);

router.use(errorHandler);

export default router;
