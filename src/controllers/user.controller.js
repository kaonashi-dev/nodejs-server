import { request, response } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

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

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      res.status(400).json({
         message: '',
         data: errors
      });
   }

   const { name, email, password, rol } = req.body;
   const user = new User({
      name,
      email,
      password,
      rol
   });

   const emailExists = await User.findOne();
   if (emailExists) {
      res.status(400).json({
         message: 'Este correo ya está registrado',
         data: user
      });
   }

   const salt = bcrypt.genSaltSync();
   user.password = bcrypt.hashSync(password, salt);

   await user.save().then(response => {
      console.log('response');
      console.log(response);
   }).catch(err => {
      console.log('error');
      console.log(err);
   })

   res.status(201).json({
      message: 'POST API',
      data: user
   });
}

const userPut = (req = request, res = response) => {

   const id = req.params.id;

   res.json({
      message: 'PUT API',
      data: id
   });
}

const userPatch = (req = request, res = response) => {
   res.json({
      message: 'PATCH API'
   });
}

export {
   userGet,
   userPost,
   userPut,
   userPatch
}