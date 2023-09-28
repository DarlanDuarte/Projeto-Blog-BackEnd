"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _AuthModels = require('../models/AuthModels'); var _AuthModels2 = _interopRequireDefault(_AuthModels);

class AuthController {
   async Login(req, res) {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json(`Email ou Password não foram passados!`)

    const result = await _AuthModels2.default.Login({ email, password })

    if (_optionalChain([result, 'optionalAccess', _ => _.invalidEmail])) return res.status(400).json(result.invalidEmail)
    if (_optionalChain([result, 'optionalAccess', _2 => _2.invalidPassword])) return res.status(400).json(result.invalidPassword)

    const { ...user } = result.usuario
    const token = result.token

    return res.status(200).json({ sucess: result.sucess, user: user.email, token: token })
  }

   async getProfile(req, res) {
    try {
      return res.status(200).json({ message: `Rota Autorizada com Sucesso!`, user: req.userAuth })
    } catch (e) {
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }
}

exports. default = new AuthController()
