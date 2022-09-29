import { CustomError } from "./custom-error";

export class NotFound extends CustomError {
  statusCode = 404;
  constructor() {
    super('not found erro');
    Object.setPrototypeOf(this, NotFound.prototype  );
  }
  serializeError() {
    return [{ message: "route not found" }];
  }
}
