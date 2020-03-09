import { RequestHandler } from 'express';
import user from '../models/user';

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await user.find({}).exec();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  const { username, password, phone } = req.body;
  try {
    const result = await new user({
      username,
      password,
      phone
    }).save();
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};
