import CustomError from './custom-error';
import HttpStatus from 'http-status';

export default class NotFoundError extends CustomError {
  constructor(message) {
    super(message, HttpStatus.NOT_FOUND);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}