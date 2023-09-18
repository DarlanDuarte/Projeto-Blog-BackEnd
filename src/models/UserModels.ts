import database from '../database/connection'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { ICreateUser, IUser } from '../interfaces/interfaces'

class UserModels {
  public async createUser({ name, email, senha }: ICreateUser) {
    try {
      const existUser = await database.select('*').table('users').where({ email })

      if (existUser.length > 0) return { error: `Email já existe!` }

      await database.table('users').insert({ name, email, password: senha })

      const user = await database.select(['id', 'name', 'email', 'password']).table('users').where({ email })

      return { user }
    } catch (e: any) {
      console.log(`Não foi possivel criar usuário!`, e.message)
    }
  }

  public async getUsers() {
    try {
      const result = await database.select('*').table('users')

      if (result.length === 0) return { error: `Nenhum Usuário Encontrado` }

      return {
        result,
      }
    } catch (e: any) {
      console.log(`Não foi possivel pegar os Usuários!`, e.message)
    }
  }

  public async deleteUser({ id }: { id: string | number }) {
    try {
      const result = await database.table('users').where({ id }).del()

      if (result === 0) return { error: `Usuário não existe!` }

      return {
        result,
      }
    } catch (e: any) {
      console.log(`Error ao tentar Deletar Usuário!`, e.message)
    }
  }

  public async updateUser({
    name,
    email,
    senha,
    id,
  }: {
    name: string
    email: string
    senha: string
    id: string | number
  }) {
    try {
      const update = await database.table('users').where({ id }).update({ name, email, password: senha })
      console.log(update)

      if (update === 0) return { invalid: `Usuário não existe!` }

      const user: IUser[] = await database.table('users').select('*').where({ id })

      return {
        user,
        update,
      }
    } catch (e: any) {
      console.log(`Error ao tentar Atualizar Usuário!`, e.message)
    }
  }
}

export default new UserModels()
