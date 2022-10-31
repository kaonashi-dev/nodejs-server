import { Router } from 'express';
import { check } from 'express-validator';

import { validateJWT, inputValidator, includeRole } from '../middlewares';
import {
   getAll,
   create,
} from '../controllers/category.controller';

const router = Router();

//Listar todas las categorias
router.get('/', getAll);

//Crear una categoria
router.post('/', [
   validateJWT,
   includeRole('ADMIN', 'EDITOR'),
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   inputValidator
], create);

// Devuelve una categoria po id
router.get('/:id', getAll);

export default router;