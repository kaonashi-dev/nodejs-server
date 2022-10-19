import { request, response } from "express";

const userGet = (req = request, res = response) => {
   res.json({
      message: 'GET API'
   });
}

const userPost = (req = request, res = response) => {
   res.status(201).json({
      message: 'POST API'
   });
}

export {
   userGet,
   userPost
}