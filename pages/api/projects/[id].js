import dbConnect from "../../../utils/dbConnect";
import Project from "../../../models/Project.js";

export default async function getProjectId(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const project = await Project.findOne({ slug: id });
        if (!project) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, data: project });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
