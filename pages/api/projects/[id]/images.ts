import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../../auth/[...nextauth]';
import dbConnect from '../../../../utils/dbConnect';
import Project from '../../../../models/Project';
import promisifyMiddleware from '../../../../middleware/promisfyMiddleware';
import multerUpload from '../../../../middleware/multerMiddleWare';

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

export default async function imagesUpdate(
  req: NextApiRequestWithFiles,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await dbConnect();
    switch (method) {
      case 'PUT':
        try {
          await promisifyMiddleware(req, res, multerUpload);
          const project = await Project.findById(id);
          const newImages = req.files.map((image) => ({
            url: image.path,
            filename: image.filename,
          }));
          project.imageUrl.push(...newImages);
          await project.save();
          if (req.body.delete) {
            await project.updateOne({
              $pull: { imageUrl: { filename: { $in: req.body.delete } } },
            });
            const results: Promise<void>[] = [];
            req.body.delete.forEach((pic: string) => {
              results.push(cloudinary.uploader.destroy(pic));
            });
            await Promise.all(results);
          }
          return res.status(201).send({ success: true });
        } catch (err) {
          console.log(err);
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(401).json({ success: false });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
