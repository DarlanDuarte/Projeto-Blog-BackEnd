import { Router } from 'express'
import UserController from '../controller/UserController'

const userRouter = Router()

userRouter.get('/user', UserController.getUsers)
userRouter.post('/user', UserController.createUser)

export default userRouter
