import { RequestHandler } from 'express';
import * as db from '../db';
import { Field } from '../type';

export const newDirectory: RequestHandler = async (req, res) => {
  try {
    const { tableName, fields } = req.body as { tableName: string; fields: Field[] };
    await db.createTable(tableName, fields);
    res.sendStatus(200);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
