import { request, response } from 'express';

import Category from '../models/category';

const getAll = async (req = request, res = response) => {

   res.json({
      message: 'OK'
   });
}

const create = async (req = request, res = response) => {

   const name = req.body.name.toUpperCase();

   const categoryExists = await Category.findOne({ name });
   if (categoryExists) {
      return res.status(400).json({
         message: `La categoria ${name} ya existe`,
         data: {}
      });
   }

   const insertData = {
      name,
      user: req.uidUser,
      status: false
   }

   const category = await new Category(insertData);
   await category.save();

   return res.status(201).json({
      message: `La categoria ${name} se guardó correctamente`,
      data: category
   });
}

export {
   getAll,
   create
}