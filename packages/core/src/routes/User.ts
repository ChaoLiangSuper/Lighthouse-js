import express from 'express';
import { authorizationHandler } from '../utils/authorizationHandler';
import { getAllUsers, login, logout } from '../controllers/user';

const router = express.Router();

router.post('/login', login);
router.get('/logout', [authorizationHandler, logout]);

router.get('/user/all', [authorizationHandler, getAllUsers]);

export default router;
