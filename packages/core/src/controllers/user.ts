import { RequestHandler } from 'express';
import * as userModel from '../models/user';
import { ErrorHandler } from '../utils/errorHandler';

export const getAllUsers: RequestHandler = async (_req, res, next) => {
  try {
    const result = await userModel.getAllUsers();
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};
