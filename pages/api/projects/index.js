import dbConnect from '../../../utils/dbConnect'
import Project from "../../../models/Project.js"

export default async function getProject(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                await dbConnect()
                const projects = await Project.find({})
                res.status(200).json({ success: true, data: projects })
            } catch (err) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}