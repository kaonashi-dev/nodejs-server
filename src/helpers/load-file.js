import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const loadFile = (file, savePath = '', extensionValid = ['png', 'jpg']) => {

   return new Promise((resolve, reject) => {

      let uploadPath;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const tempName = file.name.split('.');
      const extension = tempName[(tempName.length - 1)];

      // Validar extension
      if (!extensionValid.includes(extension)) {
         return reject('Este formato no es valido');
      }

      const newName = uuidv4() + '.' + extension;
      uploadPath = path.join(__dirname, '../uploads/', savePath, newName);

      file.mv(uploadPath, function (err) {
         if (err) {
            console.log(err);
            return reject('Internal server error');
         }
         resolve('Archivo guardado: ' + newName);
      });

   });

}

export {
   loadFile
}