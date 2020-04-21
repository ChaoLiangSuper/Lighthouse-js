import { RequestHandler } from 'express';
import * as db from '../db';
import { Field } from '../type';

interface NewDirectoryBody {
  tableName: string;
  fields: Field[];
}

export const newDirectory: RequestHandler<{}, {}, NewDirectoryBody> = async (req, res) => {
  try {
    const { tableName, fields } = req.body;
    await db.createTable(tableName, fields);
    res.sendStatus(200);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
