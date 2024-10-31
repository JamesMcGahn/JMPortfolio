import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../utils/dbConnect';
import Project from '../../../models/Project';
import promisifyMiddleware from '../../../middleware/promisfyMiddleware';
import multerUpload from '../../../middleware/multerMiddleWare';

interface NextApiRequestWithFiles extends NextApiRequest {
  files: Express.Multer.File[];
}

export default async function getProject(
  req: NextApiRequestWithFiles,
  res: NextApiResponse,
) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);
  switch (method) {
    case 'GET':
      try {
        await dbConnect();
        const projects = await Project.find({});
        res.status(200).json({ success: true, data: projects });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      if (session) {
        try {
          await dbConnect();
          await promisifyMiddleware(req, res, multerUpload);

          const project = await Project.create(req.body);
          project.imageUrl = req.files.map((image) => ({
            url: image.path,
            filename: image.filename,
          }));
          project.stack = req.body.stack
            .split(',')
            .map((item: string) => item.trim().toLowerCase());
          await project.save();
          res.status(201).send({ project: project.slug });
        } catch (err) {
          console.log(err);
          res.status(400).json({ success: false, message: err });
        }
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
