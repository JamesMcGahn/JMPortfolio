import dbConnect from '../../../../utils/dbConnect';
import Project from '../../../../models/Project.js';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default async function getProjectId(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  switch (method) {
    case 'GET':
      try {
        let project = null;
        const checkForHexRegExp = /^[0-9a-fA-F]{24}$/;

        if (checkForHexRegExp.test(id)) {
          project = await Project.findById(id);
        } else {
          project = await Project.findOne({ slug: id });
        }

        if (!project) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, data: project });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      if (session) {
        try {
          const project = await Project.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });

          if (!project) return res.status(400).json({ success: false });
          res.status(200).json({ success: true, data: project });
        } catch (err) {
          console.log(err);
          res.status(400).json({ success: false });
        }
      }
      break;
    case 'DELETE':
      if (session) {
        try {
          const project = await Project.findByIdAndDelete(id);
          const images = project.imageUrl;
          const results = [];
          images.forEach((pic) => {
            results.push(cloudinary.uploader.destroy(pic.filename));
          });
          await Promise.all(results);
          res.status(200).json({ success: true });
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
