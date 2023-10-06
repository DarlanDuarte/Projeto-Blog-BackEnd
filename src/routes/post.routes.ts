import { Request, Router } from 'express'
import PostController from '../controller/PostController'
import AuthMiddlewares from '../middlewares/authmiddlewares'
import upload from '../middlewares/uploadmiddlewares'
const postRouter = Router()

postRouter.post('/posts', AuthMiddlewares, upload.single('image'), PostController.createPosts)

postRouter.get('/user/posts', AuthMiddlewares, PostController.getPostsUser)
postRouter.get('/posts', PostController.getAllPost)
postRouter.get('/posts/:id', PostController.getPostById)

postRouter.delete('/posts/:id', AuthMiddlewares, PostController.deletePost)
postRouter.put('/posts/:id', AuthMiddlewares, PostController.updatePost)

export default postRouter
