import { Router } from 'express';
import { check } from 'express-validator';

import { inputValidator } from '../middlewares/inputs-validator';
import { emailExists, isValidRole, existsUserId } from '../helpers/db-validators';

import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', [
   inputValidator
], login);

export default router;