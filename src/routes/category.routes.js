import { Router } from 'express';
import { check } from 'express-validator';

import { existsCategoryId } from '../helpers/db-validators';
import { validateJWT, inputValidator, includeRole, isAdminRole } from '../middlewares';
import {
   getAll,
   getById,
   create,
   update,
   remove
} from '../controllers/category.controller';

const router = Router();

//Listar todas las categorias
router.get('/', getAll);

//Conseguir una categoria
router.get('/:id', [
   check('id').custom(existsCategoryId),
   inputValidator
], getById);

//Crear una categoria
router.post('/', [
   validateJWT,
   includeRole('ADMIN', 'EDITOR'),
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   inputValidator
], create);

// Actualizar una categoria
router.put('/:id', [
   validateJWT,
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('id').custom(existsCategoryId),
   inputValidator
], update);

// Borrar una categoria
router.delete('/:id', [
   validateJWT,
   isAdminRole,
   check('id').custom(existsCategoryId),
   inputValidator
], remove);

export default router;