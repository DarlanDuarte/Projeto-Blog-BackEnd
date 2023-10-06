import { NextFunction, Request, Response } from 'express'

const CorsMiddlewares = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://backend-blog-project.cyclic.app')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  next()
}

export default CorsMiddlewares
