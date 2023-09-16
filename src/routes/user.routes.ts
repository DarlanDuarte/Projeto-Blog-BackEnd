import { Router } from 'express'

const userRouter = Router()

userRouter.get('/user', (req, res) => {
  return res.json(`Pegando Usuário`)
})

export default userRouter
