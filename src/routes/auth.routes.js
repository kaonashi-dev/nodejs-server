import { Router } from 'express';
import { check } from 'express-validator';

import { inputValidator } from '../middlewares/inputs-validator';

import { login, loginGoogle } from '../controllers/auth.controller';

const router = Router();

router.post('/login', [
   check('email', 'El correo es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatorio').not().isEmpty(),
   inputValidator
], login);

router.post('/google', [
   check('id_token', 'El id_token es obligatorio').not().isEmpty(),
   inputValidator
], loginGoogle);

export default router;