import { createModel } from './Model';

export const ProductOrigens = {
  0: 'Nacional', 
  1: 'Estrangeira - Direta',
  2: 'Estrangeira - Mercado Interno'
}

export const ProductTypes = {
  'S': 'Serviço', 
  'M': 'Mercadoria'
}

const Product = createModel('PRODUTO');


export default Product
