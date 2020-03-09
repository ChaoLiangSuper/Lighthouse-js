import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.error(err);
  res.send(500);
};

export default errorHandler;
