import dbConnect from "../../../../../utils/dbConnect"
import Art from "../../../../../models/Art"
import { getSession } from 'next-auth/client'
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});


export default async function artIdProtectDel(req, res) {
    const {
        query: { id },
        method
    } = req

    const session = await getSession({ req })
    if (session) {
        switch (method) {
            case 'DELETE':
                try {
                    await dbConnect();
                    const art = await Art.findByIdAndDelete(id)
                    let images = art.imageUrl
                    for (let pic of images) {
                        await cloudinary.uploader.destroy(pic.filename)
                    }
                    res.status(200).json({ success: true })
                } catch (err) {
                    res.status(400).json({ success: false })
                }
                break;
            default:
                res.status(400).json({ success: false })
                break;
        }
    } else {

        return res.status(401).json({ success: false })
    }
}