import { request, response } from "express";

const userGet = (req = request, res = response) => {

   const {page = '1', limit = '10'} = req.query;

   res.json({
      message: 'GET API',
      data: {
         page, limit
      }
   });
}

const userPost = (req = request, res = response) => {
   res.status(201).json({
      message: 'POST API',
      data: req.body
   });
}

const userPut = (req = request, res = response) => {

   const id = req.params.id;

   res.json({
      message: 'PUT API',
      data: id
   });
}

const userPatch = (req = request, res = response) => {
   res.json({
      message: 'PATCH API'
   });
}

export {
   userGet,
   userPost,
   userPut,
   userPatch
}