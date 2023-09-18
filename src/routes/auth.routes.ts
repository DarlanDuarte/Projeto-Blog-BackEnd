import { Router } from 'express'
import AuthController from '../controller/AuthController'
import AuthMiddlewares from '../middlewares/authmiddlewares'

const authRouter = Router()

authRouter.post('/login', AuthController.Login)

authRouter.get('/profile', AuthMiddlewares, AuthController.getProfile)

export default authRouter
