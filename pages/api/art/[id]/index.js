import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import dbConnect from '../../../../utils/dbConnect';
import Art from '../../../../models/Art';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default async function artId(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  switch (method) {
    case 'GET':
      try {
        const art = await Art.findById(id);
        if (!art) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, data: art });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      if (session) {
        try {
          await dbConnect();
          const art = await Art.findByIdAndDelete(id);
          const images = art.imageUrl;

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
