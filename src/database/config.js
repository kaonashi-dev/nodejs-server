import mongoose from 'mongoose'; 

const DatabseConnection = async () => {

   try {
      
      await mongoose.createConnection(process.env.MONGODB_URI).asPromise();

      console.log('--- database online ---');

   } catch (error) {
      console.log(error);
      console.log('--- error connecting database ---');
   }

}

export {
   DatabseConnection
}