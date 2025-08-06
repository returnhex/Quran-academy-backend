import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: Error & { statusCode?: number; status?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errorDetails: err,
  });
};

export default globalErrorHandler;
