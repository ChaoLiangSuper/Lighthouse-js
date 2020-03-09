import { RequestHandler } from 'express';
import record from '../models/record';
import directory from '../models/directory';

export const getRecords: RequestHandler = async (req, res, next) => {
  try {
    const result = await record.find({}).exec();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const createRecord: RequestHandler = async (req, res, next) => {
  const { data, directoryName } = req.body;
  try {
    const existDirec = await directory.findOne({ name: directoryName }).exec();
    const result = await new record({ data, directory: existDirec }).save();
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};
