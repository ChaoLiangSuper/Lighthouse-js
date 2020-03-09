import { RequestHandler } from 'express';
import organization from '../models/organization';

export const getOrganizations: RequestHandler = async (req, res, next) => {
  try {
    const result = await organization.find({}).exec();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const createOrganization: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  try {
    const result = await new organization({
      name
    }).save();
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};
