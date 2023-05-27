import dbConnect from "../../../../utils/dbConnect"
import Project from "../../../../models/Project"
import { getSession } from "next-auth/client"
import multer from 'multer'
const cloudinary = require('cloudinary').v2
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import pify from 'pify'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'jamesmcgahn',
        allowedFormats: ['jpeg', 'png', 'jpg', 'gif']
    }
})


export const config = {
    api: {
        bodyParser: false,
    },
}

const upload = pify(multer({ storage }).array('imageUrl'))

export default async function projectPost(req, res) {
    const session = await getSession({ req })
    if (session && req.method === 'POST') {
        try {
            await dbConnect()
            await upload(req, res)

            const project = await Project.create(req.body)
            project.imageUrl = req.files.map(image => ({ url: image.path, filename: image.filename }))
            project.stack = req.body.stack.split(',').map(item => item.trim().toLowerCase())
            await project.save()
            res.status(201).send({ project: project.id })

        } catch (err) {
            res.status(400).json({ success: false, message: err })
        }
    } else {
        res.status(401).json({ message: "Access Denied" })
    }
}