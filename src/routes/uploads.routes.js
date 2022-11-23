import { Router } from 'express';
import { check } from 'express-validator';

import { uploadFile, updateImage, getImage } from '../controllers/uploads.controller';
import { inputValidator, fileValidator } from '../middlewares/';
import { isValidCollection } from '../helpers/db-validators';

const router = Router();

router.post('/', [
   fileValidator,
   inputValidator,
], uploadFile);

router.put('/:collection/:id', [
   check('id', 'Error mongo id').isMongoId(),
   check('collection').custom(c => isValidCollection(c, ['user', 'product'])),
   fileValidator,
   inputValidator
], updateImage);

router.get('/:collection/:id', [
   check('id', 'Error mongo id').isMongoId(),
   check('collection').custom(c => isValidCollection(c, ['user', 'product'])),
   inputValidator
], getImage);

export default router;