import { Router } from 'express';
import { check } from 'express-validator';

import { inputValidator } from '../middlewares/inputs-validator';

import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', [
   check('email', 'El correo es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatorio').not().isEmpty(),
   inputValidator
], login);

export default router;