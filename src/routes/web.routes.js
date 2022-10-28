import { Router } from 'express';

const router = Router();

router.get('/login', (_req, res) => {

   const googleClientId = process.env.GOOGLE_CLIENT_ID;
   res.render('login', { googleClientId });

});

export default router;