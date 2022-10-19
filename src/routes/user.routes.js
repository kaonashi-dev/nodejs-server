import { Router } from 'express';

import {
   userGet,
   userPost,
   userPut,
   userPatch
} from '../controllers/user.controller';

const router = Router();

router.get('/', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.patch('/', userPatch);

export default router;