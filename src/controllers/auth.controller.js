import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user';
import { createLoginJWT } from '../helpers/jwt-generator';

const login = async (req = request, res = response) => {

   const { email, password } = req.body;

   try {

      console.log('params');
      console.log(email, password);

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

      return res.status(201).json({
         message: 'ok',
         data: {
            user,
            token
         }
      });

   } catch (error) {
      console.log('Login error =>', error);
      return res.status(400).json({
         message: 'Ocurrio un error',
         data: {}
      });
   }

}

export {
   login
}