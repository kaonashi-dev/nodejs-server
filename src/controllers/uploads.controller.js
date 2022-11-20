import path from 'path';
import { fileURLToPath } from 'url';
import { request, response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const loadFile = async (req = request, res = response) => {

   let uploadPath;
   const extensionValid = ['png', 'jpg'];

   if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).json({
         message: 'No hay archivos',
         data: {}
      });
   }

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   const { file } = req.files;
   const tempName = file.name.split('.');
   const extension = tempName[(tempName.length - 1)];

   if (!extensionValid.includes(extension)) {
      return res.status(400).json({
         message: 'Este formato no es valido',
         data: {}
      });
   }

   const newName = uuidv4() + '.' + extension;
   uploadPath = path.join(__dirname, '../uploads/' + newName);

   file.mv(uploadPath, function (err) {
      if (err) {
         console.log(err);
         return res.status(500).json({
            message: 'Internal server error',
            data: {}
         });
      }

      return res.status(200).json({
         message: 'Archivo guardado',
         data: {}
      });
   });

}

export {
   loadFile
}