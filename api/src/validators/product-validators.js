import { check } from 'express-validator';
import { ProductTypes, ProductOrigens } from '../database/model/Product';

// Reutilization of code, check value from mapped object
const checkEnumObjectField = (availableEnum) => val => {
  if (!val || !Object.keys(availableEnum).includes(val)) {
    throw new Error(`Selecione uma das opões: ${Object.values(availableEnum)}`)
  }
  return true;
}

const checkDecimalField = (integerMax, decimalMax) => val => {
  const [ integer, decimal ] = val.split(".");

  if (!integer || !decimal) throw new Error("O valor deve ser um decimal");
  if (integer.length > integerMax) throw new Error(`O valor inteiro máximo permitido é de ${integerMax} dígitos`);
  if (decimal.length > decimalMax) throw new Error(`O valor decimal máximo permitido é de ${decimalMax} dígitos`);

  return true;
}

export const productValidator = [
  check('DESCRICAO').not().isEmpty().withMessage("O campo descrição é obrigatório!"),
  check('CD_BARRA').custom(val => {
    if (!val || !val.length) return true;
    if (val.length > 0 && val.length > 14) {
      throw new Error("O código de barras deve conter no máximo 14 caracteres!")
    }
    return true;
  }),
  check('TIPO').custom(checkEnumObjectField(ProductTypes)),
  check('ORIGEM').custom(checkEnumObjectField(ProductOrigens)),

  check('DT_ULTIMA_COMPRA').custom(val => {
    if (!val || !(/\d{2}\/\d{2}\/\d{4}/.test(val))) {
      throw new Error("Insira uma data no padrão dd/MM/yyyy")
    }
    return true;
  }),

  check('VL_PRECO_VENDA')
  .custom(checkDecimalField(4, 2))
]