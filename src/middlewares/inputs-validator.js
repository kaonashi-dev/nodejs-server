import { request, response } from 'express';
import { validationResult } from 'express-validator';

const inputValidator = (req = request, res = response, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         message: '',
         data: errors
      });
   }

   next();

}

export {
   inputValidator
}