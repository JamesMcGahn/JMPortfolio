import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../utils/dbConnect';
import Art from '../../../models/Art';
import promisifyMiddleware from '../../../middleware/promisfyMiddleware';
import multerUpload from '../../../middleware/multerMiddleWare';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

interface NextApiRequestWithFiles extends NextApiRequest {
  files: Express.Multer.File[];
}

export default async function art(
  req: NextApiRequestWithFiles,
  res: NextApiResponse,
) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const artPieces = await Art.find({});
        res.status(200).json({ success: true, data: artPieces });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      if (session) {
        try {
          await dbConnect();
          await promisifyMiddleware(req, res, multerUpload);

          const newArt = await Art.create(req.body);
          newArt.imageUrl = req.files.map((image) => ({
            url: image.path,
            filename: image.filename,
          }));
          await newArt.save();
          res.status(201).send({ art: newArt.id });
        } catch (err) {
          console.log(err);
          res.status(400).json({ success: false });
        }
      }
      break;
    default:
      res.status(401).json({ success: false });
      break;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
