import { request, response } from 'express';
import { Types } from 'mongoose';

import { Product } from '../models/';

const getAll = async (req = request, res = response) => {

   const { start = '0', limit = '5' } = req.query;

   const [products, total] = await Promise.all([
      Product.find({ status: true })
         .skip(Number(start))
         .limit(Number(limit))
         .populate('user', 'name')
         .populate('category', 'name')
         .exec(),
      Product.countDocuments({ status: true }).exec()
   ]);

   res.json({
      total,
      data: {
         products,
         total
      }
   });
}

const getById = async (req = request, res = response) => {

   const { id } = req.params;

   const infoProduct = await Product.findById(id)
      .populate('user', 'name')
      .populate('category', 'name')
      .exec();

   if (!infoProduct.status) {
      res.status(200).json({
         message: 'Este producto no está disponible',
         data: {}
      });
   }

   res.status(200).json({
      data: infoProduct
   });
}

const create = async (req = request, res = response) => {

   const name = req.body.name.toUpperCase();
   const { category, price, description, available } = req.body;

   const productExists = await Product.findOne({ name });
   if (productExists) {
      return res.status(400).json({
         message: `El producto "${name}" ya existe`,
         data: {}
      });
   }

   const insertData = {
      name,
      category,
      price, description, available,
      user: req.uidUser,
      status: true
   }

   const product = await new Product(insertData);
   await product.save();

   return res.status(201).json({
      message: `El producto ${name} se guardó correctamente`,
      data: product
   });
}

const update = async (req = request, res = response) => {

   const { id } = req.params;
   let name = req.body.name;
   if (name) name = name.toUpperCase();

   const { category, price, description, available } = req.body;

   const updateData = {
      name, category, price, description, available,
      user: req.uidUser
   }

   const product = await Category.findByIdAndUpdate(id, updateData, { new: true });

   return res.status(200).json({
      message: `El producto "${name}" fue actualizado`,
      data: product
   });
}

const remove = async (req = request, res = response) => {

   const { id } = req.params;

   const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

   return res.status(200).json({
      message: `El producto fue eliminado`,
      data: product
   });
}

const productSearch = async (term = '', res = response) => {

   if (Types.ObjectId.isValid(term)) {
      const product = await Product.findById(term)
         .populate('user', 'name')
         .populate('category', 'name')
         .exec();
      return res.status(200).json({
         message: '',
         data: {
            results: (product) ? [product] : [],
         }
      });
   }

   const regex = new RegExp(term, 'i');

   const products = await Product.find({ name: regex, status: true })
      .populate('user', 'name')
      .populate('category', 'name')
      .exec();
   return res.status(200).json({
      message: '',
      data: {
         results: products,
      }
   });
}

export {
   create,
   getAll,
   getById,
   productSearch,
   remove,
   update
}