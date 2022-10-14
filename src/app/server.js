import express from 'express';

export default class Server {

   constructor() {
      this.port = process.env.PORT;
      this.app = express();

      this.routes();
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