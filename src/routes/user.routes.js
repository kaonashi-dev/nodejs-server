import { Router } from 'express';
import { check } from 'express-validator';

import {
   userGet,
   userPost,
   userPut,
   userPatch
} from '../controllers/user.controller';

const router = Router();

router.get('/', userGet);

router.post('/', [
   check('email', 'El correo no es válido').isEmail()
], userPost);

router.put('/:id', userPut);

router.patch('/', userPatch);

export default router;