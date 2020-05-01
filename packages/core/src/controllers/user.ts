import { RequestHandler } from 'express';
import { getAllUsers } from '../models/user';

export const allUser: RequestHandler = async (req, res) => {
  try {
    await getAllUsers();
    res.sendStatus(200);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
