import CustomError from './custom-error';
import HttpStatus from 'http-status';

export default class ValidationResultError extends CustomError {
  constructor(errors) {
    super(undefined, HttpStatus.NOT_FOUND);

    this.errors = errors;
    Object.setPrototypeOf(this, ValidationResultError.prototype);
  }

  serializeErrors() {
    return this.errors.map(error => {
      console.log(error);
      return ({
        message: error.msg,
        field: error.param
      })
    })
  }
}