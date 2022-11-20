import { Router } from 'express';

import { loadFile } from '../controllers/uploads.controller';

const router = Router();

router.post('/', loadFile);

export default router;