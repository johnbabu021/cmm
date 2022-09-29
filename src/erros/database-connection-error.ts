import { CustomError } from "./custom-error";

export default class DatabaseConnectionError extends CustomError {
  reason = "Error  connecting to database";
  statusCode = 400;
  constructor() {
    super('database error');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeError() {
    return [{ message: this.reason }];
  }
}
