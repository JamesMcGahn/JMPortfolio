import type { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'jamesmcgahn',
    allowed_formats: ['jpeg', 'png', 'jpg', 'gif'],
  } as {
    folder: string;
    allowed_formats: string[];
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const multerUpload = multer({ storage });

const multerMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction,
) => {
  multerUpload.array('imageUrl')(
    req as unknown as Request,
    res as unknown as Response,
    next,
  );
};

export default multerMiddleware;
