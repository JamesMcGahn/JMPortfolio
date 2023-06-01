import dbConnect from "../../../../../utils/dbConnect";
import Project from "../../../../../models/Project";
import { getSession } from "next-auth/react";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default async function projectUpdate(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    switch (method) {
      case "PUT":
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
        break;
      case "DELETE":
        try {
          const project = await Project.findByIdAndDelete(id);
          let images = project.imageUrl;
          for (let pic of images) {
            await cloudinary.uploader.destroy(pic.filename);
          }
          res.status(200).json({ success: true });
        } catch (err) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    return res.status(401).json({ success: false });
  }
}
