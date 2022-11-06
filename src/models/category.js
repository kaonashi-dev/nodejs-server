import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
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
   }
});

CategorySchema.methods.toJSON = function () {
   const { __v, _id, status, ...category } = this.toObject();
   category.id = _id;
   return category;
}

export default model('Category', CategorySchema);
