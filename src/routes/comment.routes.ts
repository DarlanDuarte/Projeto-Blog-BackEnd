import { Router } from 'express'
import CommetController from '../controller/CommentController'
import AuthMiddlewares from '../middlewares/authmiddlewares'

const commentRouter = Router()

commentRouter.post('/posts/comment/:id', AuthMiddlewares, CommetController.CreateComment)
commentRouter.get('/posts/comment/:id', CommetController.GetCommentByIdPost)

export default commentRouter
