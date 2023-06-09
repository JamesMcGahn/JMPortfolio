import { getServerSession } from 'next-auth/next';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import pify from 'pify';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../utils/dbConnect';
import Project from '../../../models/Project';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'jamesmcgahn',
    allowedFormats: ['jpeg', 'png', 'jpg', 'gif'],
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = pify(multer({ storage }).array('imageUrl'));

export default async function getProject(req, res) {
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
          await upload(req, res);

          const project = await Project.create(req.body);
          project.imageUrl = req.files.map((image) => ({
            url: image.path,
            filename: image.filename,
          }));
          project.stack = req.body.stack
            .split(',')
            .map((item) => item.trim().toLowerCase());
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
