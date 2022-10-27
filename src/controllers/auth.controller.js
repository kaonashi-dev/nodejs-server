import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user';

const login = async (req = request, res = response) => {

   const { email, password } = req.body;

   try {

      console.log('params');
      console.log(email, password);

      const user = await User.findOne({ email, status: true }).exec();
      if (!user) {
         return res.status(400).json({
            message: 'Correo / Contraseña no son correctos',
            data: {}
         });
      }

      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
         return res.status(400).json({
            message: 'Correo / Contraseña no son correctos',
            data: {}
         });
      }

      return res.status(201).json({
         message: 'Login ok',
         data: []
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