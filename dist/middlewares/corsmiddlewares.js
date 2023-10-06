"use strict";Object.defineProperty(exports, "__esModule", {value: true});

const CorsMiddlewares = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://backend-blog-project.cyclic.app')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  next()
}

exports. default = CorsMiddlewares
