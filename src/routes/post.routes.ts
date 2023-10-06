import { Request, Router } from 'express'
import PostController from '../controller/PostController'
import AuthMiddlewares from '../middlewares/authmiddlewares'
import multer, { FileFilterCallback } from 'multer'

const postRouter = Router()

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/')
  },

  filename(req, file, cb) {
    cb(null, new Date().getTime() + file.originalname)
  },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
})

postRouter.post('/posts', AuthMiddlewares, upload.single('image'), PostController.createPosts)

postRouter.get('/user/posts', AuthMiddlewares, PostController.getPostsUser)
postRouter.get('/posts', PostController.getAllPost)
postRouter.get('/posts/:id', PostController.getPostById)

postRouter.delete('/posts/:id', AuthMiddlewares, PostController.deletePost)
postRouter.put('/posts/:id', AuthMiddlewares, PostController.updatePost)

export default postRouter
