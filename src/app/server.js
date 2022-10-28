import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';
import { engine } from 'express-handlebars';

import { DatabseConnection } from '../database/config';
import webRouter from '../routes/web.routes';
import authRouter from '../routes/auth.routes';
import userRouter from '../routes/user.routes';

export default class Server {

   constructor() {
      this.port = process.env.PORT;
      this.app = express();

      this.pathWeb = '/';
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

      this.app.use(express.json());

      this.app.use(express.static(path.join(__dirname, 'public')));

      this.app.engine('handlebars', engine());
      this.app.set('view engine', 'handlebars');
      this.app.set('views', path.join(__dirname, '../views'));
   }

   routes() {
      this.app.use(this.pathWeb, webRouter);
      this.app.use(this.pathUsers, userRouter);
      this.app.use(this.pathAuth, authRouter);
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server on port ->', this.port);
      });
   }
}