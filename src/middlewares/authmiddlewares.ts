import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import database from '../database/connection'
import { IJwtPayload } from '../interfaces/interfaces'

const AuthMiddlewares = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers

    if (!authorization) return res.status(401).json(`Não Autorizado!`)

    const token = authorization.split(' ')[1]

    const { userId } = jwt.verify(token, process.env.JWT_SECRET ?? '') as IJwtPayload

    if (!userId) return res.status(401).json(`Não Autorizado!`)

    const user = await database.table('users').select('id', 'name', 'email').where({ id: userId })

    req.userAuth = user[0]

    next()
  } catch (e: any) {
    console.log(e.message)
    return res.status(500).json(`Error interno no Servidor`)
  }
}

export default AuthMiddlewares
