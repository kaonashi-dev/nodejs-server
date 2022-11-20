import { request, response } from 'express';

const fileValidator = (req = request, res = response, next) => {
   if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).json({
         message: 'No hay archivos',
         data: {}
      });
   }

   next();
}

export {
   fileValidator
}