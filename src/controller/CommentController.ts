import { Request, Response } from 'express'
import CommentModels from '../models/CommentModels'

class Comments {
  public async CreateComment(req: Request, res: Response) {
    try {
      const { comment } = req.body
      const { id: userId, name: usuario } = req.userAuth
      const { id: postId } = req.params

      if (!comment) return res.status(400).json(`Comentário é obrigatorio!`)
      if (!userId) return res.status(400).json(`Usuário não existe!`)
      if (!postId) return res.status(400).json(`Id do Post não foi passado`)

      const comentario = await CommentModels.CreateComment({ comment, userId, postId, usuario })

      if (comentario?.NoExist) return res.status(400).json(comentario.NoExist)
      if (comentario?.error) return res.status(400).json(comentario.error)

      return res.status(201).json({ message: `Comentário criado com sucesso!`, comment: comentario?.resp })
    } catch (e: any) {
      console.log(e.message)
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }

  public async GetCommentByIdPost(req: Request, res: Response) {
    try {
      const { id: postId } = req.params

      if (!postId) return res.status(400).json(`Post não existe!`)

      const comment = await CommentModels.GetCommentByIdPost({ postId })

      if (comment?.error) return res.status(400).json(comment.error)

      const { ...resp } = comment?.resp

      const comentarios = Object.values(resp)

      return res.status(200).json(comentarios)
    } catch (e: any) {
      console.log(e.message)
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }
}

export default new Comments()
