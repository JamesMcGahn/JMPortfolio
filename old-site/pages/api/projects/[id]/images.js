import pify from 'pify';
import { getServerSession } from 'next-auth/next';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { authOptions } from '../../auth/[...nextauth]';
import dbConnect from '../../../../utils/dbConnect';
import Project from '../../../../models/Project';

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

export default async function imagesUpdate(req, res) {
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
          await upload(req, res);
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
            const results = [];
            req.body.delete.forEach((pic) => {
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
