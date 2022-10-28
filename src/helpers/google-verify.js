import { OAuth2Client } from 'google-auth-library';


async function googleVerify(token) {

   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
   const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
   });
   const { name, email, picture } = ticket.getPayload();
   
   return { name, email, image: picture };
}

export {
   googleVerify
}