import HttpStatus from 'http-status';

import Product from '../database/model/Product';

import catchAsync from "../helpers/catch-async";
import * as DateHelper from '../helpers/date-helper';

import NotFoundError from '../errors/not-found-error';

// Check product Id(CODIGO)
export const checkParameterCodigo = catchAsync(async (req, res, next) => {
   const { CODIGO } = req.params
   const productExists = await Product.findById(CODIGO)

   if (!productExists) throw new NotFoundError(`O produto não existe pelo id ${CODIGO}`);
   next()
});


export const findProducts = catchAsync(async (req, res, next) => {
  console.log(req.query.page)
  const page = req.query.page || 1;
  const size = req.size || 5;

  const product = await Product
  ._query({}, ['CODIGO', 'DESCRICAO'])
  .limit(size)
  .offset((page - 1) * size);

  const [ count ] = await Product.count();

  console.log(page)

  res
  .status(HttpStatus.OK)
  .json({
    page,
    size,
    total: Object.values(count)[0],
    data: product 
  })
})

export const findProductById =  catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.CODIGO,
    [
      'CODIGO',
      'DESCRICAO',
      'CD_BARRA',
      'TIPO',
      'ORIGEM',
      'VL_PRECO_VENDA',
      'DT_ULTIMA_COMPRA'
    ]);

  res.status(HttpStatus.OK)
  .json({ 
    data: product
  })
});

export const createProduct = catchAsync(async (req, res, next) => {
  const {
    DESCRICAO,
    CD_BARRA,
    TIPO,
    ORIGEM, 
    DT_ULTIMA_COMPRA,
    VL_PRECO_VENDA
  } = req.body;


  const result = await Product.save({ 
    DESCRICAO,
    CD_BARRA,
    TIPO,
    ORIGEM: parseInt(ORIGEM), 
    VL_PRECO_VENDA: parseFloat(VL_PRECO_VENDA),
    DT_ULTIMA_COMPRA: DateHelper.parseDateFrom(DT_ULTIMA_COMPRA) 
  });

  res.status(HttpStatus.CREATED).json({ data: result })

});

export const updateProject = catchAsync(async (req, res, next) => {
  const { CODIGO }  = req.params;
  const {
    DESCRICAO,
    CD_BARRA,
    TIPO,
    ORIGEM,
    VL_PRECO_VENDA,
    DT_ULTIMA_COMPRA 
  } = req.body;

  console.log({ 
    DESCRICAO,
    CD_BARRA,
    TIPO,
    ORIGEM: parseInt(ORIGEM), 
    VL_PRECO_VENDA: parseFloat(VL_PRECO_VENDA),
    DT_ULTIMA_COMPRA: DateHelper.parseDateFrom(DT_ULTIMA_COMPRA) 
  })

  const result = await Product.findByIdAndUpdate(CODIGO, { 
    DESCRICAO,
    CD_BARRA,
    TIPO,
    ORIGEM: parseInt(ORIGEM), 
    VL_PRECO_VENDA: parseFloat(VL_PRECO_VENDA),
    DT_ULTIMA_COMPRA: DateHelper.parseDateFrom(DT_ULTIMA_COMPRA) 
  });

  res.status(HttpStatus.OK).json({ data: result })

});

export const deleteProject =  catchAsync(async (req, res, next) => {
  const { CODIGO }  = req.params;
  await Product.findByIdAndDelete(CODIGO)

  res.status(HttpStatus.NO_CONTENT).end()
})