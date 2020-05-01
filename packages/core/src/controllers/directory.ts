import { RequestHandler } from 'express';
import { addMetadata } from '../models/metadata';

interface NewDirectoryBody {
  tableName: string;
  fields: {};
}

export const newDirectory: RequestHandler<{}, {}, NewDirectoryBody> = async (req, res) => {
  try {
    const { tableName, fields } = req.body;
    await addMetadata(tableName, fields);
    res.sendStatus(200);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
