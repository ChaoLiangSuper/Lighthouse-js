import { RequestHandler } from 'express';

export const getUsers: RequestHandler = async (req, res, next) => {
  res.sendStatus(201);
  next();
};
