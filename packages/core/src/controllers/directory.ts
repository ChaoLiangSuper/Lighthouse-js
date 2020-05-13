import { RequestHandler } from 'express';
import * as metadataModel from '../models/metadata';
import { fieldMetadata } from '../types';
import { ErrorHandler } from '../utils/errorHandler';

interface NewDirectoryBody {
  directoryName: string;
  fields: {
    [fieldName: string]: fieldMetadata;
  };
}

export const getAllDirectories: RequestHandler = async (_req, res, next) => {
  try {
    const result = await metadataModel.getAllMetadata();
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const getOneDirectory: RequestHandler<{ directoryId: string }> = async (req, res, next) => {
  try {
    const result = await metadataModel.getOneMetadata(req.params.directoryId);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const newDirectory: RequestHandler<{}, {}, NewDirectoryBody> = async (req, res, next) => {
  try {
    const { directoryName, fields } = req.body;
    const result = await metadataModel.addMetadata(directoryName, fields);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const updateDirectory: RequestHandler<{ directoryId: string }, {}, Partial<NewDirectoryBody>> = async (
  req,
  res,
  next
) => {
  try {
    const { directoryName, fields } = req.body;
    const result = await metadataModel.updateMetadata(req.params.directoryId, directoryName, fields);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};
