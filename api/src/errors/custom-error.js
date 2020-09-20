export default class CustomError extends Error {
  
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    throw new Error("Implement this method into subclasse's");
  }
}