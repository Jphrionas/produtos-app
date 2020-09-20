import { validationResult } from 'express-validator';
import ValidationResultError from '../errors/validation-result-error';
import catchAsync from "../helpers/catch-async";

export const validationResultError = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  // First - Fail fast  method
  if (!errors.isEmpty()) throw new ValidationResultError(errors.array())

  next();
});