import mongoose from 'mongoose';

import Role from '../models/role';
import { User, Category } from '../models/';

const isValidRole = async (requestData = '') => {
   const validatedRol = await Role.findOne({ rol: requestData }).exec();
   if (!validatedRol) {
      throw new Error(`El rol (${requestData}) no es válido`);
   }
}

const emailExists = async (requestData = '') => {
   const exists = await User.findOne({ email: requestData }).exec();
   if (exists) {
      throw new Error(`El correo (${requestData}) ya está registrado`);
   }
}

const existsUserId = async (userId) => {

   if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error(`${userId} no es válido`);
   }

   const exists = await User.findById(userId).exec();
   if (!exists) {
      throw new Error(`No existe el usuario: ${userId}`);
   }
}

const existsCategoryId = async (categoryId) => {

   if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error(`El id ${categoryId} no es válido`);
   }

   const exists = await Category.findById(categoryId).exec();
   if (!exists) {
      throw new Error(`No existe una categoria con id: ${categoryId}`);
   }
}

export {
   isValidRole,
   emailExists,
   existsUserId,
   existsCategoryId
}