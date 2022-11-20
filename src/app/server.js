import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';
import { engine } from 'express-handlebars';

import { DatabseConnection } from '../database/config';
import {
   authRouter,
   categoryRouter,
   productRouter,
   userRouter,
   uploadsRouter,
   webRouter,
   searchRouter
} from '../routes/';

export default class Server {

   constructor() {
      this.port = process.env.PORT;
      this.app = express();

      this.paths = {
         auth: '/api/auth',
         categories: '/api/category',
         products: '/api/product',
         search: '/api/search',
         users: '/api/user',
         uploads: '/api/uploads',
         web: '/',
      };

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
      this.app.use(this.paths.auth, authRouter);
      this.app.use(this.paths.categories, categoryRouter);
      this.app.use(this.paths.products, productRouter);
      this.app.use(this.paths.search, searchRouter);
      this.app.use(this.paths.users, userRouter);
      this.app.use(this.paths.uploads, uploadsRouter);
      this.app.use(this.paths.web, webRouter);
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server on port ->', this.port);
      });
   }
}