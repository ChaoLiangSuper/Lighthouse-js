import { RequestHandler } from 'express';
import * as recordModel from '../models/recordData';
import { dataType } from '../types';
import { ErrorHandler } from '../utils/errorHandler';

interface NewDirectoryBody {
  recordId: number;
  data: {
    [fieldName: string]: dataType;
  };
}

export const getAllRecords: RequestHandler<{ directoryId: string }> = async (req, res, next) => {
  try {
    const result = await recordModel.getAllRecords(req.params.directoryId);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const getOneRecord: RequestHandler<{ directoryId: string; recordId: string }> = async (req, res, next) => {
  try {
    const result = await recordModel.getOneRecord(req.params.directoryId, req.params.recordId);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const newRecord: RequestHandler<{ directoryId: string }, {}, NewDirectoryBody> = async (req, res, next) => {
  try {
    const { recordId, data } = req.body;
    const result = await recordModel.addRecord(req.params.directoryId, recordId, data);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const updateRecord: RequestHandler<
  { directoryId: string; recordId: string },
  {},
  { data: NewDirectoryBody['data'] }
> = async (req, res, next) => {
  try {
    const { data } = req.body;
    const result = await recordModel.updateRecord(req.params.directoryId, req.params.recordId, data);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};
