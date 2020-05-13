import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import * as userModel from '../models/user';
import { ErrorHandler } from '../utils/errorHandler';
import { config } from '../config';

interface LoginRequestBody {
  username: string;
  password: string;
}

export const login: RequestHandler<{}, {}, LoginRequestBody> = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.getUser(username);

    if (!user) return next(new ErrorHandler(401, 'User not found'));

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user: _.omit(user, 'password') }, config.jwtToken, {
        expiresIn: '24h'
      });

      res.cookie('lh_token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true });
      return res.sendStatus(200);
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
