import database from '../database/connection'
import dataFormatada from '../utils/formatDate'
import { IPosts } from '../interfaces/interfaces'

class PostModels {
  public async createPosts({ title, description, id }: { title: string; description: string; id: string | number }) {
    try {
      const result = await database.table('posts').insert({ title, description, userId: id, createAt: dataFormatada })

      console.log(result)

      if (result.length === 0) return { msgError: `Error ao Criar Post` }

      const resp = await database.table('posts').where({ userId: id }).select('*')

      console.log(resp)

      return {
        resp: resp,
      }
    } catch (e: any) {
      console.log(`Error ao tentar criar Post`)
    }
  }

  public async getPostsUser({ id }: { id: number | string }) {
    try {
      const posts: IPosts[] = await database('posts').where({ userId: id }).select('*')

      if (posts.length === 0) return { msgError: `Nenhum Post Encontrado!` }

      return {
        posts,
      }
    } catch (e: any) {
      console.log(`Error ao tentar pegar Post de Usuário!`)
    }
  }
}

export default new PostModels()
