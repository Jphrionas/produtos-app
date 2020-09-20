import express from 'express';

import * as ProductController from '../controllers/product-controller';


import { productValidator } from '../validators/product-validators'
import { validationResultError } from '../middlewares/validation-result'
import { checkProductAlreadyExists } from '../middlewares/product'

const router = express.Router();

router.param("CODIGO", ProductController.checkParameterCodigo);
router.get('/', ProductController.findProducts);
router.get('/:CODIGO',ProductController.findProductById);

router.post('/', 
productValidator, 
validationResultError,
checkProductAlreadyExists,
ProductController.createProduct);  

router.put('/:CODIGO',
productValidator, 
validationResultError,
ProductController.updateProject);

router.delete('/:CODIGO', ProductController.deleteProject);

export default router;