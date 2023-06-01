import dbConnect from "../../../utils/dbConnect";
import Art from "../../../models/Art.js";
import multer from "multer";
const cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pify from "pify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

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

export default async function art(req, res) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const art = await Art.find({});
        res.status(200).json({ success: true, data: art });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      if (session) {
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
      }
    default:
      res.status(401).json({ success: false });
      break;
  }
}
