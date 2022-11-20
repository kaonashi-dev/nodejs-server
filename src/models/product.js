import { Schema, model } from 'mongoose';

const ProductSchema = Schema({
   name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      unique: true
   },
   status: {
      type: Boolean,
      default: true,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio']
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'La categoria es obligatoria']
   },
   price:{
      type: Number,
      default: 0,
   },
   description: {
      type: String
   },
   image: {
      type: String
   },
   available: {
      type: Boolean,
      default: true
   }
});

ProductSchema.methods.toJSON = function () {
   const { __v, _id, status, ...product } = this.toObject();
   product.id = _id;
   return product;
}

export default model('Product', ProductSchema);
