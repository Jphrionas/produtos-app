import CustomError from '../errors/custom-error';

export default (err, req, res, next) => {
  const isInstanceOf = err instanceof CustomError
  const statusCode =  isInstanceOf ? err.statusCode : 400;
  const errors = isInstanceOf ? err.serializeErrors() : [{ message: err.message }]

  res.status(statusCode).json({ errors })
}