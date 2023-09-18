import { Router } from 'express'
import UserController from '../controller/UserController'

const userRouter = Router()

userRouter.get('/user', UserController.getUsers)
userRouter.post('/user', UserController.createUser)
userRouter.delete('/user/:id', UserController.deleteUser)
userRouter.put('/user/:id', UserController.updateUser)

export default userRouter
