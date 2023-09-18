import { Router } from 'express'
import PostController from '../controller/PostController'
import AuthMiddlewares from '../middlewares/authmiddlewares'

const postRouter = Router()

postRouter.post('/posts', AuthMiddlewares, PostController.createPosts)

postRouter.get('/user/posts', AuthMiddlewares, PostController.getPostsUser)
postRouter.get('/posts', PostController.getAllPost)

postRouter.delete('/posts/:id', AuthMiddlewares, PostController.deletePost)
postRouter.put('/posts/:id', AuthMiddlewares, PostController.updatePost)

export default postRouter
