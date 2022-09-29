import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../erros/not-authorizederror";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.currentuser) {
    throw new NotAuthorizedError();
  }
  next();
};

export default requireAuth;
