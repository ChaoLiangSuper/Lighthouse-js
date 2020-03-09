import { RequestHandler } from 'express';
import directory from '../models/directory';
import organization from '../models/organization';

export const getDirectories: RequestHandler = async (req, res, next) => {
  try {
    const result = await directory.find({}).exec();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const createDirectory: RequestHandler = async (req, res, next) => {
  const { name, organizationName } = req.body;
  try {
    const existOrg = await organization.findOne({ name: organizationName }).exec();
    const result = await new directory({ name, organization: existOrg }).save();
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};
