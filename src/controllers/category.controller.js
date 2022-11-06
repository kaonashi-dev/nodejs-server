import { request, response } from 'express';
import { Types } from 'mongoose';

import Category from '../models/category';

const getAll = async (req = request, res = response) => {

   const { start = '0', limit = '5' } = req.query;

   const [categories, total] = await Promise.all([
      Category.find({ status: true })
         .skip(Number(start))
         .limit(Number(limit))
         .populate('user', 'name').exec(),
      Category.countDocuments({ status: true }).exec()
   ]);

   res.json({
      total,
      data: {
         categories,
         total
      }
   });
}

const getById = async (req = request, res = response) => {

   const { id } = req.params;

   const infoCategory = await Category.findById(id)
      .populate('user', 'name')
      .exec();

   if (!infoCategory.status) {
      res.status(200).json({
         message: 'Esta categoria no está disponible',
         data: {}
      });
   }

   res.status(200).json({
      data: infoCategory
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
      status: true
   }

   const category = await new Category(insertData);
   await category.save();

   return res.status(201).json({
      message: `La categoria ${name} se guardó correctamente`,
      data: category
   });
}

const update = async (req = request, res = response) => {

   const { id } = req.params;
   let name = req.body.name;
   const user = req.uidUser;

   name = name.toUpperCase();
   const updateData = {
      name,
      user
   }

   const category = await Category.findByIdAndUpdate(id, updateData, { new: true });

   return res.status(200).json({
      message: `La categoria "${name}" fue actualizada`,
      data: category
   });
}

const remove = async (req = request, res = response) => {

   const { id } = req.params;

   const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

   return res.status(200).json({
      message: `La categoria fue eliminada`,
      data: category
   });
}

const categorySearch = async (term = '', res = response) => {

   if (Types.ObjectId.isValid(term)) {
      const category = await Category.findById(term).exec();
      return res.status(200).json({
         message: '',
         data: {
            results: (category) ? [category] : [],
         }
      });
   }

   const regex = new RegExp(term, 'i');

   const categories = await Category.find({
      $or: [
         { name: regex },
      ],
      $and: [{ status: true }],
   }).exec();
   return res.status(200).json({
      message: '',
      data: {
         results: categories,
      }
   });
}

export {
   categorySearch,
   create,
   getAll,
   getById,
   remove,
   update
}