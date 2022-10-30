import { Router } from 'express';
import { check } from 'express-validator';

import { validateJWT, inputValidator, includeRole } from '../middlewares';
import {
   getAll,
} from '../controllers/category.controller';

const router = Router();

//Listar todas las categorias
router.get('/', getAll);

// Devuelve una categoria po id
router.get('/:id', getAll);

export default router;