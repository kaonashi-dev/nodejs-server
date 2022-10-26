import mongoose from 'mongoose'; 

const DatabseConnection = async () => {

   try {
      
      await mongoose.connect(process.env.MONGODB_URI);

      console.log('--- database online ---');

   } catch (error) {
      console.log(error);
      console.log('--- error connecting database ---');
   }

}

export {
   DatabseConnection
}