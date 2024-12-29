import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      res.setHeader('Set-Cookie', cookie.serialize('auth_token', '', {
        maxAge: -1,
        path: '/',
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
      }));
      res.status(201).json({ message: 'Session expired.' });
    } catch (error) {
      res.status(500).json({ message: "Error during session expiration", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
