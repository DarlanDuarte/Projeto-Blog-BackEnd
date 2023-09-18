import { Request, Response } from 'express'
import AuthModels from '../models/AuthModels'

class AuthController {
  public async Login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json(`Email ou Password não foram passados!`)

    const result = await AuthModels.Login({ email, password })

    if (result?.invalidEmail) return res.status(400).json(result.invalidEmail)
    if (result?.invalidPassword) return res.status(400).json(result.invalidPassword)

    const { ...user } = result.usuario
    const token = result.token

    return res.status(200).json({ sucess: result.sucess, user: user.email, token: token })
  }

  public async getProfile(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: `Rota Autorizada com Sucesso!`, user: req.userAuth })
    } catch (e: any) {
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }
}

export default new AuthController()
