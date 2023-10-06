import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import postRouter from './routes/post.routes'
import commentRouter from './routes/comment.routes'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use('/uploads', express.static('/uploads'))
    this.app.use(cors())
  }

  routes() {
    this.app.use(userRouter)
    this.app.use(authRouter)
    this.app.use(postRouter)
    this.app.use(commentRouter)
  }
}

export default new App().app
