import { request, response } from 'express';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user';

const userGet = async (req = request, res = response) => {

   const { start = '1', limit = '5' } = req.query;

   const [users, total] = await Promise.all([
      User.find({ status: true })
         .skip(Number(start))
         .limit(Number(limit)),
      User.countDocuments({ status: true })
   ]);

   res.json({
      total,
      data: users
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

   const userUpdate = await User.findByIdAndUpdate(id, userData, { new: true });

   return res.json({
      message: 'PUT API',
      data: userUpdate
   });
}

const userDelete = async (req = request, res = response) => {

   const { id } = req.params;

   /// Borrar de la db
   // const user = await User.findByIdAndDelete(id);

   const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

   return res.json({
      data: user,
      uid: req.uid
   });
}

const userSearch = async (term = '', res = response) => {

   if (Types.ObjectId.isValid(term)) {
      const user = await User.findById(term).exec();
      return res.status(200).json({
         message: '',
         data: {
            results: (user) ? [user] : [],
         }
      });
   }

   const regex = new RegExp(term, 'i');

   const users = await User.find({
      $or: [
         { name: regex },
         { email: regex },
      ],
      $and: [{ status: true }],
   }).exec();
   return res.status(200).json({
      message: '',
      data: {
         results: users,
      }
   });
}

export {
   userGet,
   userPost,
   userPut,
   userDelete,
   userSearch
}