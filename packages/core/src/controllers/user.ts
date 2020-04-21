import { RequestHandler } from 'express';
import * as db from '../db';

export const allUser: RequestHandler = async (req, res) => {
  try {
    await db.getAllUsers();
    res.sendStatus(200);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
