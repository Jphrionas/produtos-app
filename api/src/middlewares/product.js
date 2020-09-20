import Product from '../database/model/Product';
import catchAsync from '../helpers/catch-async';
import BadRequestError from '../errors/bad-request-error';

export const checkProductAlreadyExists = catchAsync(async (req, res, next) => {
  const { DESCRICAO } = req.body;

  // Separate a new middleware
  const existsProduct = await Product.findOne({ DESCRICAO });
  if (existsProduct) {
    throw new BadRequestError(`O produto ${DESCRICAO} já foi cadastrado anteriormente!`);
  }

  next();
});