import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log(err);
  res.send(500);
};

export default errorHandler;
