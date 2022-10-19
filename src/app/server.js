import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import userRouter from '../routes/user.routes';

export default class Server {

   constructor() {
      this.port = process.env.PORT;
      this.app = express();

      this.pathUsers = '/api/user';

      // Middlewares
      this.middlewares();

      // Routes app
      this.routes();
   }

   middlewares() {

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      this.app.use(express.static(path.join(__dirname, 'public')));

      this.app.use(express.json());
   }

   routes() {
      this.app.use(this.pathUsers, userRouter);
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server on port ->', this.port);
      });
   }
}