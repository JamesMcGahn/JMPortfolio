import dbConnect from "../../../utils/dbConnect";
import Art from "../../../models/Art.js"



export default async function artId(req, res) {
    const {
        query: { id },
        method
    } = req

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const art = await Art.findById(id)
                if (!art) return res.status(400).json({ success: false })

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