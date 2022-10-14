import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

export default class Server {

   constructor() {
      this.port = process.env.PORT;
      this.app = express();

      // Middlewares
      this.middlewares();

      // Routes app
      this.routes();
   }

   middlewares() {

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      this.app.use(express.static(path.join(__dirname, 'public')))
   }

   routes() {
      this.app.get('/', (req, res) => {
         res.send('Hello');
      });
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server on port ->', this.port);
      });
   }
}