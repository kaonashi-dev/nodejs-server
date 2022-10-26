import { Schema, model } from 'mongoose';

const RolesSchema = Schema({
   rol: {
      type: String,
      required: [true, 'El rol es obligatorio']
   }
});

export default model('Role', RolesSchema);
