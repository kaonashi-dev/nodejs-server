import { request, response } from 'express';

import { loadFile } from '../helpers/load-file';

const uploadFile = async (req = request, res = response) => {

   if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).json({
         message: 'No hay archivos',
         data: {}
      });
   }

   const finalPath = await loadFile(req.files.file, 'img');
   return res.status(200).json({
      message: 'Archivo guardado',
      data: finalPath
   });

}

export {
   uploadFile
}