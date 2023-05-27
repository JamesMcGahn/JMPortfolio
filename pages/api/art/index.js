import dbConnect from '../../../utils/dbConnect'
import Art from "../../../models/Art.js"

export default async function art(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const art = await Art.find({})
                res.status(200).json({ success: true, data: art })
            } catch (err) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}