import { request, response } from 'express';

import User from '../models/user';

const login = async (req = request, res = response) => {
   return res.status(201).json({
      message: 'Login ok',
      data: []
   });
}

export {
   login
}