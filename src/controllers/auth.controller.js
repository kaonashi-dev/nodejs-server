import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user';
import { createLoginJWT } from '../helpers/jwt-generator';
import { googleVerify } from '../helpers/google-verify';

const login = async (req = request, res = response) => {

   const { email, password } = req.body;

   try {

      // Verificar el correo y que el usuario esté activo
      const user = await User.findOne({ email, status: true }).exec();
      if (!user) {
         return res.status(400).json({
            message: 'Correo / Contraseña no son correctos',
            data: {}
         });
      }

      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
         return res.status(400).json({
            message: 'Correo / Contraseña no son correctos',
            data: {}
         });
      }

      // Crear el token
      const token = await createLoginJWT(user.id);

      return res.status(200).json({
         message: 'ok',
         data: {
            user,
            token
         }
      });

   } catch (error) {
      console.log('Login error =>', error);
      return res.status(500).json({
         message: 'Ocurrio un error',
         data: {}
      });
   }

}

const loginGoogle = async (req = request, res = response) => {

   try {
      const { id_token } = req.body;

      const { name, email, image } = await googleVerify(id_token);

      let user = await User.findOne({ email }).exec();

      if (!user) {
         user = new User({
            name,
            email,
            password: '#$#',
            image,
            rol: 'USER',
            google: true
         });
         await user.save();
      }

      if (!user.status) {
         return res.status(401).json({
            message: 'Este usuario está bloqueado',
            data: {}
         });
      }

      // Crear el token
      const token = await createLoginJWT(user.id);

      return res.status(200).json({
         message: 'ok',
         data: {
            user,
            token
         }
      });

   } catch (error) {
      console.log('Login google error =>', error);
      return res.status(500).json({
         message: 'Ocurrio un error',
         data: {}
      });
   }

}

export {
   login,
   loginGoogle
}