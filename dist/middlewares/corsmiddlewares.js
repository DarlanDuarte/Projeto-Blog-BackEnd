"use strict";Object.defineProperty(exports, "__esModule", {value: true});

const CorsMiddlewares = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  next()
}

exports. default = CorsMiddlewares
