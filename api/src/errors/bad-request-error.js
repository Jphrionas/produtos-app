import CustomError from './custom-error';
import HttpStatus from 'http-status';

export default class BadRequestError extends CustomError {
  constructor(message) {
    super(message, HttpStatus.BAD_REQUEST);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}