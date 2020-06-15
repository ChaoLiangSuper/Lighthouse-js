import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import UserModel from '../models/User';
import { UserAttributes } from '../../../types/User';
import { ErrorHandler } from '../utils/errorHandler';
import { config } from '../config';

export const login: RequestHandler<{}, {}, UserAttributes> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.getOneUserByUsername(username);

    if (!user) return next(new ErrorHandler(401, 'User not found'));

    const userWithoutPwd = _.omit(user.toJSON(), 'password', '');

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user: userWithoutPwd }, config.jwtToken, {
        expiresIn: config.tokenExp
      });

      res.status(200);
      return res.send({ token });
    } else {
      return next(new ErrorHandler(401, 'Unauthenticated'));
    }
  } catch (err) {
    return next(new ErrorHandler(500, err));
  }
};

export const logout: RequestHandler = (_req, res) => {
  res.clearCookie('lh_token');
  return res.sendStatus(200);
};

export const getAllUsers: RequestHandler = async (_req, res, next) => {
  try {
    const result = await UserModel.getAllUsers();
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};
