import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 500;
  constructor(public errors: ValidationError[]) {
    super("request validation error");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeError() {
    return this.errors.map((item) => {
      return { message: item.msg, field: item.param };
    });
  }
}
