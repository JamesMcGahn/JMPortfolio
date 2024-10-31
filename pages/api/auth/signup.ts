import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { authOptions } from './[...nextauth]';

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === 'POST') {
      const { username, password, name } = req.body;
      await dbConnect();

      const userFound = await User.findOne({ username });
      if (userFound) {
        return res.status(409).json({ success: 'User Already Exists' });
      }

      const user = new User({ username, name, password });
      await user.save();
      return res.status(201).json({ success: 'true' });
    }
  } else {
    res.status(401).json({ message: 'Not valid' });
  }
}
