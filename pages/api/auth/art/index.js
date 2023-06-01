import dbConnect from "../../../../utils/dbConnect";
import Art from "../../../../models/Art";
import { getSession } from "next-auth/react";
import multer from "multer";
const cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pify from "pify";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jamesmcgahn",
    allowedFormats: ["jpeg", "png", "jpg", "gif"],
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = pify(multer({ storage }).array("imageUrl"));

export default async function artProtPost(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  if (session) {
    switch (method) {
      case "POST":
        try {
          await dbConnect();
          await upload(req, res);

          const art = await Art.create(req.body);
          art.imageUrl = req.files.map((image) => ({
            url: image.path,
            filename: image.filename,
          }));
          await art.save();
          res.status(201).send({ art: art.id });
        } catch (err) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
}
