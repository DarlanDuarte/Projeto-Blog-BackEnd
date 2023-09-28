"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _connection = require('../database/connection'); var _connection2 = _interopRequireDefault(_connection);


class AuthModels {
   async Login({ email, password }) {
    const user = await _connection2.default.table('users').select('*').where({ email })

    if (user.length === 0) return { invalidEmail: `Usuário não existe!` }

    const { ...usuario } = user[0]

    const senha = usuario.password

    const verifyPassword = await _bcrypt2.default.compare(password, senha)

    if (!verifyPassword) return { invalidPassword: `Senha Invalida!` }

    const id = usuario.id
    console.log(id)

    const token = _jsonwebtoken2.default.sign({ userId: id }, _nullishCoalesce(process.env.JWT_SECRET, () => ( '')), { expiresIn: '7d' })

    console.log(token)

    return {
      sucess: `Login Realizado com Sucesso!`,
      usuario: usuario,
      token: token,
    }
  }
}

exports. default = new AuthModels()
