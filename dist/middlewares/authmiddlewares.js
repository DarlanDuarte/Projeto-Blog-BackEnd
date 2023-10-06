"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _connection = require('../database/connection'); var _connection2 = _interopRequireDefault(_connection);


const AuthMiddlewares = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) return res.status(401).json(`Não Autorizado! Token não foi foi passado.`)

    const token = authorization.split(' ')[1]

    const { userId } = _jsonwebtoken2.default.verify(token, _nullishCoalesce(process.env.JWT_SECRET, () => ( ''))) 

    if (!userId) return res.status(401).json(`Não Autorizado!`)

    const user = await _connection2.default.table('users').select('id', 'name', 'email').where({ id: userId })

    req.userAuth = user[0]

    next()
  } catch (e) {
    console.log(e.message)
    return res.status(500).json(`Error interno no Servidor`)
  }
}

exports. default = AuthMiddlewares
