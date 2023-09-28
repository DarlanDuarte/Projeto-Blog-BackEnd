import { Request, Response } from 'express'
import CommentModels from '../models/CommentModels'

class Comments {
  public async CreateComment(req: Request, res: Response) {
    try {
      const { comment } = req.body
      const { id: userId } = req.userAuth
      const { id: postId } = req.params

      if (!comment) return res.status(400).json(`Comentário é obrigatorio!`)
      if (!userId) return res.status(400).json(`Usuário não existe!`)
      if (!postId) return res.status(400).json(`Id do Post não foi passado`)

      const comentario = await CommentModels.CreateComment({ comment, userId, postId })

      if (comentario?.NoExist) return res.status(400).json(comentario.NoExist)
      if (comentario?.error) return res.status(400).json(comentario.error)

      return res.status(201).json({ message: `Comentário criado com sucesso!`, comment: comentario?.resp })
    } catch (e: any) {
      console.log(e.message)
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }
}

export default new Comments()
