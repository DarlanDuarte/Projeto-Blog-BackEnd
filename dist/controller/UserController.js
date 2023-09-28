"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _UserModels = require('../models/UserModels'); var _UserModels2 = _interopRequireDefault(_UserModels);

class UserController {
   async createUser(req, res) {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) return res.status(400).json(`Todos os Campos são obrigatórios`)
      const senha = await _bcrypt2.default.hash(password, 10)

      const user = await _UserModels2.default.createUser({ name, email, senha })

      if (_optionalChain([user, 'optionalAccess', _ => _.error])) return res.status(400).json(user.error)

      return res.status(201).json({ msg: `Usuário Criado Com Sucesso!`, user: _optionalChain([user, 'optionalAccess', _2 => _2.user]) })
    } catch (e) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

   async getUsers(req, res) {
    try {
      const users = await _UserModels2.default.getUsers()

      if (_optionalChain([users, 'optionalAccess', _3 => _3.error])) return res.status(400).json(users.error)

      return res.status(200).json(_optionalChain([users, 'optionalAccess', _4 => _4.result]))
    } catch (e) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

   async deleteUser(req, res) {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json(`Id do Usuário não foi passado`)

      const user = await _UserModels2.default.deleteUser({ id })

      if (_optionalChain([user, 'optionalAccess', _5 => _5.error])) return res.status(400).json(_optionalChain([user, 'optionalAccess', _6 => _6.error]))

      return res.status(200).json(`Usuário Deletado com sucesso!`)
    } catch (e) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

   async updateUser(req, res) {
    try {
      const { name, email, password } = req.body
      const { id } = req.params

      if (!name || !email || !password) return res.status(400).json(`Credenciais não foram passadas!`)
      if (!id) return res.status(400).json(`Id do Usuário Invalido!`)

      const senha = await _bcrypt2.default.hash(password, 10)

      const user = await _UserModels2.default.updateUser({ name, email, senha, id })

      if (_optionalChain([user, 'optionalAccess', _7 => _7.invalid])) return res.status(400).json(user.invalid)

      return res.status(200).json({ message: `Usuário Atualizado Com Sucesso!`, user: _optionalChain([user, 'optionalAccess', _8 => _8.user]) })
    } catch (e) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }
}

exports. default = new UserController()
