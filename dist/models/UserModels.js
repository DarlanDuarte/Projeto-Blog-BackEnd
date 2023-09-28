"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connection = require('../database/connection'); var _connection2 = _interopRequireDefault(_connection);




class UserModels {
   async createUser({ name, email, senha }) {
    try {
      const existUser = await _connection2.default.select('*').table('users').where({ email })

      if (existUser.length > 0) return { error: `Email já existe!` }

      await _connection2.default.table('users').insert({ name, email, password: senha })

      const user = await _connection2.default.select(['id', 'name', 'email', 'password']).table('users').where({ email })

      return { user }
    } catch (e) {
      console.log(`Não foi possivel criar usuário!`, e.message)
    }
  }

   async getUsers() {
    try {
      const result = await _connection2.default.select('*').table('users')

      if (result.length === 0) return { error: `Nenhum Usuário Encontrado` }

      return {
        result,
      }
    } catch (e) {
      console.log(`Não foi possivel pegar os Usuários!`, e.message)
    }
  }

   async deleteUser({ id }) {
    try {
      const result = await _connection2.default.table('users').where({ id }).del()

      if (result === 0) return { error: `Usuário não existe!` }

      return {
        result,
      }
    } catch (e) {
      console.log(`Error ao tentar Deletar Usuário!`, e.message)
    }
  }

   async updateUser({
    name,
    email,
    senha,
    id,
  }




) {
    try {
      const update = await _connection2.default.table('users').where({ id }).update({ name, email, password: senha })
      console.log(update)

      if (update === 0) return { invalid: `Usuário não existe!` }

      const user = await _connection2.default.table('users').select('*').where({ id })

      return {
        user,
        update,
      }
    } catch (e) {
      console.log(`Error ao tentar Atualizar Usuário!`, e.message)
    }
  }
}

exports. default = new UserModels()
