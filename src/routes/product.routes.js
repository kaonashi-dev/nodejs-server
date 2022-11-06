import { Router } from 'express';
import { check } from 'express-validator';

import { existsCategoryId, existsProductId } from '../helpers/db-validators';
import { validateJWT, inputValidator, includeRole } from '../middlewares';
import {
   getAll,
   getById,
   create,
   update,
   remove
} from '../controllers/product.controller';

const router = Router();

//Listar todos los productos
router.get('/', getAll);

//Conseguir un producto por id
router.get('/:id', [
   check('id').custom(existsProductId),
   inputValidator
], getById);

//Crear un producto
router.post('/', [
   validateJWT,
   includeRole('ADMIN', 'EDITOR'),
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('category', 'La categoria es obligatorio').not().isEmpty(),
   check('category').custom(existsCategoryId),
   inputValidator
], create);

// Actualizar un producto
router.put('/:id', [
   validateJWT,
   check('id').custom(existsProductId),
   check('category', 'La categoria es obligatorio').not().isEmpty(),
   check('category').custom(existsCategoryId),
   inputValidator
], update);

// Borrar un producto
router.delete('/:id', [
   validateJWT,
   includeRole('ADMIN', 'EDITOR'),
   check('id').custom(existsProductId),
   inputValidator
], remove);

export default router;