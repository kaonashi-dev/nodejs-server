import { request, response } from 'express';

import { userSearch } from '../controllers/user.controller';
import { categorySearch } from '../controllers/category.controller';
import { productSearch } from '../controllers/product.controller';

const collections = [
   'category',
   'product',
   'user',
   'roles'
]

const search = async (req = request, res = response) => {

   const { collection, term } = req.params;

   if (!collections.includes(collection)) {
      return res.status(400).json({
         message: `"${collection}" no es permitido para buscar`,
         data: {}
      });
   }

   switch (collection) {

      case 'category':
         categorySearch(term, res);
         break;

      case 'product':
         productSearch(term, res);
         break;

      case 'user':
         userSearch(term, res);
         break;

      default:
         res.status(500).json({
            message: 'No fue posible hacer la busqueda',
            data: {}
         });
         break;
   }

}

export {
   search
}