import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { config } from '../config';
import { RequestWithParsedData } from '../types';
import { ErrorHandler } from './errorHandler';

export const authorizationHandler: RequestHandler = (req: RequestWithParsedData, _res, next) => {
  const authorization = req.headers['authorization'] as string;
  const token = authorization && /^Bearer /.test(authorization) && authorization.split(' ')[1];
  if (!token) return next(new ErrorHandler(401, 'Unauthenticated'));

  try {
    const user = jwt.verify(token, config.jwtToken) as RequestWithParsedData['user'];
    req.user = user;
    return next();
  } catch (err) {
    return next(new ErrorHandler(401, 'Unauthenticated'));
  }
};
