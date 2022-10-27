import { request, response } from 'express';

const isAdminRole = (req = request, res = response, next) => {

   if (!req.user) {
      return res.status(500).json({
         message: 'No se puede verificar el rol',
         data: {}
      });
   }

   const { rol } = req.user;
   if (rol != 'ADMIN') {
      return res.status(401).json({
         message: 'No puedes ejecutar esta accion',
         data: {}
      });
   }

   next();
}

const includeRole = (...roles) => {

   return (req = request, res = response, next) => {

      if (!req.user) {
         return res.status(500).json({
            message: 'No se puede verificar el rol',
            data: {}
         });
      }

      const { rol } = req.user;
      if (!roles.includes(rol)) {
         return res.status(401).json({
            message: 'No puedes ejecutar esta accion',
            data: {}
         });
      }

      next();
   }

}

export {
   isAdminRole,
   includeRole
}