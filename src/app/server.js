import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';

import { DatabseConnection } from '../database/config';
import userRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';

export default class Server {

   constructor() {
      this.port = process.env.PORT;
      this.app = express();

      this.pathAuth = '/api/auth';
      this.pathUsers = '/api/user';

      // Database connection
      this.dbConnect();

      // Middlewares
      this.middlewares();

      // Routes app
      this.routes();
   }

   async dbConnect() {
      await DatabseConnection();
   }

   middlewares() {

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      
      this.app.use(cors());

      this.app.use(express.static(path.join(__dirname, 'public')));

      this.app.use(express.json());
   }

   routes() {
      this.app.use(this.pathUsers, userRouter);
      this.app.use(this.pathAuth, authRouter);
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server on port ->', this.port);
      });
   }
}