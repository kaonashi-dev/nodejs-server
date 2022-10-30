import { request, response } from 'express';

import User from '../models/user';

const getAll = async (req = request, res = response) => {

   res.json({
      message: 'OK'
   });
}

export {
   getAll
}