import { Request, Response } from 'express'
import PostModels from '../models/PostModels'
import { IPosts } from '../interfaces/interfaces'

class PostsController {
  public async createPosts(req: Request, res: Response) {
    try {
      const { title, description } = req.body
      const { id } = req.userAuth

      if (!title || !description) return res.status(400).json({ error: `Titulo ou Descrição não foram passados!` })
      if (!id) return res.status(400).json({ error: `Usuário do Post não existe!` })

      const post = await PostModels.createPosts({ title, description, id })

      if (post?.msgError) return res.status(400).json(post.msgError)

      return res.status(201).json({ msg: `Post Criado com Sucesso!`, Post: post?.resp })
    } catch (e: any) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

  public async getPostsUser(req: Request, res: Response) {
    try {
      const { id } = req.userAuth

      if (!id) return res.status(400).json(`Usuário não foi passado`)

      const postsUser = await PostModels.getPostsUser({ id })

      if (postsUser?.msgError) return res.status(400).json(postsUser.msgError)

      const { ...posts } = postsUser?.posts as IPosts[]

      return res.status(200).json({ posts })
    } catch (e: any) {
      return res.status(500).json(`Error Interno do Servidor!`)
    }
  }
}

export default new PostsController()
