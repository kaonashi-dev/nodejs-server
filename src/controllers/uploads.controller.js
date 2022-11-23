import { request, response } from 'express';

import { User, Product } from '../models/';
import { loadFile, deleteImage, existsImage } from '../helpers/load-file';

const uploadFile = async (req = request, res = response) => {

   const finalPath = await loadFile(req.files.file, 'img');
   return res.status(200).json({
      message: 'Archivo guardado',
      data: finalPath
   });

}

const updateImage = async (req = request, res = response) => {

   const { id, collection } = req.params;

   let model;

   switch (collection) {
      case 'user':
         model = await User.findById(id);
         if (!model) {
            return res.status(400).json({
               message: 'No existe el usuario',
               data: {}
            });
         }
         break;

      case 'product':
         model = await Product.findById(id);
         if (!model) {
            return res.status(400).json({
               message: 'No existe el producto',
               data: {}
            });
         }
         break;


      default:
         return res.status(500).json({
            message: 'Internal server error',
            data: {}
         });
   }

   try {
      if (model.image) deleteImage('users/' + model.image);
   } catch (error) {
      return res.status(500).json({
         message: 'Internal server error - image',
         data: {}
      });
   }

   const finalPath = await loadFile(req.files.file, 'users');
   model.image = finalPath
   await model.save();

   return res.status(200).json({
      message: 'Imagen actualizada',
      data: model
   });

}

const getImage = async (req = request, res = response) => {

   const { id, collection } = req.params;

   let model;

   switch (collection) {
      case 'user':
         model = await User.findById(id);
         if (!model) {
            return res.status(400).json({
               message: 'No existe el usuario',
               data: {}
            });
         }
         break;

      case 'product':
         model = await Product.findById(id);
         if (!model) {
            return res.status(400).json({
               message: 'No existe el producto',
               data: {}
            });
         }
         break;


      default:
         return res.status(500).json({
            message: 'Internal server error',
            data: {}
         });
   }

   const finalPath = existsImage('users/' + model.image);
   console.log(finalPath);
   return res.sendFile(finalPath);

}


export {
   uploadFile,
   updateImage,
   getImage
}