import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import database from '../database/connection'
import { IUser } from '../interfaces/interfaces'

class AuthModels {
  public async Login({ email, password }: { email: string; password: string }) {
    const user: IUser[] = await database.table('users').select('*').where({ email })

    if (user.length === 0) return { invalidEmail: `Usuário não existe!` }

    const { ...usuario } = user[0]

    const senha = usuario.password

    const verifyPassword = await bcrypt.compare(password, senha)

    if (!verifyPassword) return { invalidPassword: `Senha Invalida!` }

    const id = usuario.id
    console.log(id)

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET ?? '', { expiresIn: '7d' })

    console.log(token)

    return {
      sucess: `Login Realizado com Sucesso!`,
      usuario: usuario,
      token: token,
    }
  }
}

export default new AuthModels()
