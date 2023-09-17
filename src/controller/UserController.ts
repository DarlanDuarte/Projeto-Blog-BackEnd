import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModels from '../models/UserModels'

class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) return res.status(400).json(`Todos os Campos são obrigatórios`)
      const senha = await bcrypt.hash(password, 10)

      const user = await UserModels.createUser({ name, email, senha })

      if (user?.error) return res.status(400).json(user.error)

      return res.status(201).json({ msg: `Usuário Criado Com Sucesso!`, user: user?.user })
    } catch (e: any) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModels.getUsers()

      if (users?.error) return res.status(400).json(users.error)

      return res.status(200).json(users?.result)
    } catch (e: any) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json(`Id do Usuário não foi passado`)

      const user = await UserModels.deleteUser({ id })

      if (user?.error) return res.status(400).json(user?.error)

      return res.status(200).json(`Usuário Deletado com sucesso!`)
    } catch (e: any) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }
}

export default new UserController()
