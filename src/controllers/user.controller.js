import { request, response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/user';

const userGet = (req = request, res = response) => {

   const { page = '1', limit = '10' } = req.query;

   res.json({
      message: 'GET API',
      data: {
         page, limit
      }
   });
}

const userPost = async (req = request, res = response) => {

   const { name, email, password, rol } = req.body;
   const user = new User({
      name,
      email,
      password,
      rol
   });

   const salt = bcrypt.genSaltSync();
   user.password = bcrypt.hashSync(password, salt);

   await user.save().then(response => {
      console.log('response');
      console.log(response);
   }).catch(err => {
      console.log('error');
      console.log(err);
   })

   return res.status(201).json({
      message: 'POST API',
      data: user
   });
}

const userPut = async (req = request, res = response) => {

   const { id } = req.params;
   const { _id, password, google, email, ...userData } = req.body;

   if (password) {
      const salt = bcrypt.genSaltSync();
      userData.password = bcrypt.hashSync(password, salt);
   }

   const userUpdate = await User.findByIdAndUpdate(id, userData);

   return res.json({
      message: 'PUT API',
      data: userUpdate
   });
}

const userPatch = (req = request, res = response) => {
   return res.json({
      message: 'PATCH API'
   });
}

export {
   userGet,
   userPost,
   userPut,
   userPatch
}