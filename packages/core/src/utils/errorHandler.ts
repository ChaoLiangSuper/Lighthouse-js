import { ErrorRequestHandler } from 'express';

export class ErrorHandler {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ErrorHandler) {
    res.status(err.status);
    res.json({
      msg: err.message
    });
  } else {
    res.sendStatus(500);
  }
};
