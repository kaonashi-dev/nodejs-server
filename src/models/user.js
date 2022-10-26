import { Schema, model } from 'mongoose';

const UserSchema = Schema({
   name: {
      type: String,
      required: [true, 'El nombre es obligatorio']
   },
   email: {
      type: String,
      required: [true, 'El correo es obligatorio']
   },
   password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
   },
   image: {
      type: String,
   },
   rol: {
      type: String,
      required: true,
      emun: ['ADMIN', 'USER']
   },
   status: {
      type: Boolean,
      default: true,
   },
   google: {
      type: Boolean,
      default: false
   }
});

UserSchema.methods.toJSON = function () {
   const { __v, password, ...user } = this.toObject();
   return user;
}

export default model('User', UserSchema);