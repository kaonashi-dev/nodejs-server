import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const validateJWT = async (req = request, res = response, next) => {

   const token = req.header('authorization');

   if (!token) {
      return res.status(401).json({
         message: 'No se encontró el token',
         data: {}
      });
   }

   try {

      const { uid } = jwt.verify(token, process.env.KEY_JWT_SECRET);

      // Buscar el usuario
      const user = await User.findById(uid).exec();
      
      if (!user) {
         return res.status(401).json({
            message: 'El token no es valido',
            data: {}
         });
      }

      if (!user.status) {
         return res.status(401).json({
            message: 'El token no es valido',
            data: {}
         });
      }

      req.user = user;
      req.uidUser = user._id;

      next();

   } catch (error) {
      return res.status(401).json({
         message: 'El token no es valido',
         data: {}
      });
   }

}

export {
   validateJWT
}