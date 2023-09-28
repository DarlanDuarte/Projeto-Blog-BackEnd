import database from '../database/connection'
import { ICreateComment, IComment } from '../interfaces/interfaces'

class CommentModels {
  public async CreateComment({ comment, userId, postId, usuario }: ICreateComment) {
    try {
      const existPostId = await database('posts').where({ id: postId }).select('*')
      console.log(existPostId)

      if (existPostId.length === 0) return { NoExist: `Post do comentário não existe!` }

      const result = await database('comments').insert({ comment, userId, postId, usuario })

      if (result.length === 0) return { error: `Não foi possivel criar um Comentário!` }

      const resp: IComment[] = await database('comments').where({ postId }).select('*')

      return {
        resp,
      }
    } catch (e: any) {
      console.log(e.message)
    }
  }

  public async GetCommentByIdPost({ postId }: { postId: number | string }) {
    try {
      const resp = await database('comments').where({ postId }).select('*')

      if (resp.length === 0) return { error: `PostId não existe!` }

      return {
        resp,
      }
    } catch (e: any) {
      console.log(e.message)
    }
  }
}

export default new CommentModels()
