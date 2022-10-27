import jwt from 'jsonwebtoken';

const createLoginJWT = (uid = '') => {

   return new Promise((resolve, reject) => {

      const payload = { uid };

      jwt.sign(payload, process.env.KEY_JWT_SECRET, {
         expiresIn: '3h'
      }, (err, token) => {

         if (err) {
            console.log('Error create token =>', err);
            reject('No fue posible generar el token')
         } else {
            resolve(token);
         }

      });

   });

}

export {
   createLoginJWT
}