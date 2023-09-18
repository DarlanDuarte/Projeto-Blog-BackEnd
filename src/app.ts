import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import postRouter from './routes/post.routes'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes() {
    this.app.use(userRouter)
    this.app.use(authRouter)
    this.app.use(postRouter)
  }
}

export default new App().app
