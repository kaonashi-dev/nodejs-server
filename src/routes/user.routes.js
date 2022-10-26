import { Router } from 'express';
import { check } from 'express-validator';

import { inputValidator } from '../middlewares/inputs-validator';
import { emailExists, isValidRole, existsUserId } from '../helpers/db-validators';
import {
   userGet,
   userPost,
   userPut,
   userPatch
} from '../controllers/user.controller';

const router = Router();

router.get('/', userGet);

router.post('/', [
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   check('password', 'La contraseña debe tener 7 o más caracteres').isLength({ min: 7 }),
   check('email', 'El correo no es válido').isEmail(),
   check('email').custom(emailExists),
   check('rol').custom(isValidRole),
   // check('rol', 'El rol no es válido').isIn(['ADMIN', 'USER']),
   inputValidator
], userPost);

router.put('/:id', [
   // check('id', 'No es un ID valido').isMongoId(),
   check('id').custom(existsUserId),
   inputValidator
], userPut);

router.patch('/', userPatch);

export default router;