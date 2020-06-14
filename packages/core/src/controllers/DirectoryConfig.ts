import { RequestHandler } from 'express';
import { ErrorHandler } from '../utils/errorHandler';
import DirectoryConfigModel, { DirectoryConfigAttributes } from '../models/DirectoryConfig';

export const getAllDirectorieConfigs: RequestHandler = async (_req, res, next) => {
  try {
    const result = await DirectoryConfigModel.getAllDirectoryConfigs();
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const getOneDirectoryConfig: RequestHandler<{ directoryConfigId: string }> = async (req, res, next) => {
  try {
    const result = await DirectoryConfigModel.getOndDirectoryConfig(req.params.directoryConfigId);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const newDirectoryConfig: RequestHandler<{}, {}, DirectoryConfigAttributes> = async (req, res, next) => {
  try {
    const result = await DirectoryConfigModel.addDirectoryConfig(req.body);
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};

export const updateDirectoryConfig: RequestHandler<
  { directoryConfigId: string },
  {},
  DirectoryConfigAttributes
> = async (req, res, next) => {
  try {
    const result = await DirectoryConfigModel.updateDirectoryConfig({ ...req.body, id: req.params.directoryConfigId });
    res.status(200);
    res.send(result);
  } catch (err) {
    next(new ErrorHandler(500, err));
  }
};
