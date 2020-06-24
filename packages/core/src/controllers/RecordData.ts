import { RequestHandler } from 'express';
import RecordDataModel from '../models/RecordData';
import { RecordDataAttributes } from '@lighthousejs/types/RecordData';
import { ErrorHandler } from '../utils/errorHandler';

export const getAllRecordData: RequestHandler<{ directoryConfigId: string }> = async (req, res, next) => {
  try {
    const result = await RecordDataModel.getAllRecordData(req.params.directoryConfigId);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const getOneRecordData: RequestHandler<{ directoryConfigId: string; recordDataId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const result = await RecordDataModel.getOneRecordData(req.params.directoryConfigId, req.params.recordDataId);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const addRecordData: RequestHandler<{ directoryConfigId: string }, {}, RecordDataAttributes> = async (
  req,
  res,
  next
) => {
  try {
    const result = await RecordDataModel.addRecordData(req.params.directoryConfigId, { data: req.body.data });
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const updateRecordData: RequestHandler<
  { directoryConfigId: string; recordDataId: string },
  {},
  RecordDataAttributes
> = async (req, res, next) => {
  try {
    const result = await RecordDataModel.updateRecordData(
      req.params.directoryConfigId,
      req.params.recordDataId,
      req.body
    );
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};
