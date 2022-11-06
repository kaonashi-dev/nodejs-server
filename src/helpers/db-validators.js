import mongoose from 'mongoose';

import Role from '../models/role';
import { User, Category, Product } from '../models/';

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
      throw new Error(`El id de categoria no es válido`);
   }

   const exists = await Category.findById(categoryId).exec();
   if (!exists) {
      throw new Error(`No existe una categoria con id: ${categoryId}`);
   }
}

const existsProductId = async (productId) => {

   if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error(`El id ${productId} no es válido`);
   }

   const exists = await Product.findById(productId).exec();
   if (!exists) {
      throw new Error(`No existe un producto con id: ${productId}`);
   }
}

export {
   emailExists,
   existsCategoryId,
   existsProductId,
   existsUserId,
   isValidRole,
}