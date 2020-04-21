import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { config } from '../config';

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, config.jwtToken);
    req.user = user;
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
