import { NextApiRequest, NextApiResponse } from 'next';

type MiddleWare = (req: NextApiRequest, res: NextApiResponse, next: (err?: unknown) => void) => void

 function promisifyMiddleware(req: NextApiRequest, res: NextApiResponse, middleware:MiddleWare) {
    return new Promise<void>((resolve, reject) => {
    middleware(req, res, (result: unknown) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
}

export default promisifyMiddleware