import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../erros/custom-error";

export const errorHanlder = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log("request validation");
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }

  res.status(400).json({
    errors: [{ message: "Someting went Wrong" }],
  });
};
