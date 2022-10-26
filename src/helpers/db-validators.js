import mongoose from 'mongoose';

import Role from '../models/role';
import User from '../models/user';

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

export {
   isValidRole,
   emailExists,
   existsUserId
}