import database from '../database/connection'
import { ICreateComment, IComment } from '../interfaces/interfaces'

class CommentModels {
  public async CreateComment({ comment, userId, postId }: ICreateComment) {
    try {
      const existPostId = await database('comments').where({ postId }).select('*')

      if (existPostId.length === 0) return { NoExist: `Post do comentário não existe!` }

      const result = await database('comments').insert({ comment, userId, postId })

      if (result.length === 0) return { error: `Não foi possivel criar um Comentário!` }

      const resp: IComment[] = await database('comments').where({ postId }).select('*')

      console.log(resp)

      return {
        resp,
      }
    } catch (e: any) {
      console.log(e.message)
    }
  }
}

export default new CommentModels()
