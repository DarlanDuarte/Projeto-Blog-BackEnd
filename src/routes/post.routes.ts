import { Router } from 'express'
import PostController from '../controller/PostController'
import AuthMiddlewares from '../middlewares/authmiddlewares'

const postRouter = Router()

postRouter.post('/post', AuthMiddlewares, PostController.createPosts)
postRouter.get('/user/posts', AuthMiddlewares, PostController.getPostsUser)

export default postRouter
