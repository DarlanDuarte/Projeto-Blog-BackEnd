import database from '../database/connection'
import dataFormatada from '../utils/formatDate'
import { IPosts, IUpdatePost } from '../interfaces/interfaces'

class PostModels {
  public async createPosts({
    title,
    description,
    id,
    image,
  }: {
    title: string
    description: string
    id: string | number
    image: string | undefined
  }) {
    try {
      const result = await database
        .table('posts')
        .insert({ title, description, userId: id, createAt: dataFormatada, image })

      if (result.length === 0) return { msgError: `Error ao Criar Post` }

      const resp = await database.table('posts').where({ userId: id }).select('*')

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

  public async getAllPosts() {
    try {
      const resp: IPosts[] = await database('posts').select('*')

      if (resp.length === 0) return { msgError: `Nenhum Post foi encontrado` }

      return {
        resp,
      }
    } catch (e: any) {
      console.log(`Error ao tentar pegar todos os posts!`, e.message)
    }
  }

  public async getPostById({ id }: { id: number | string }) {
    try {
      const resp: IPosts[] = await database('posts').where({ id }).select('*')
      console.log(resp)

      if (resp.length === 0) return { error: `Nenhum Post Encontrado!` }

      return {
        resp: resp[0],
      }
    } catch (e: any) {
      console.log(e.message)
    }
  }

  public async deletePost({ postId, userId }: { postId: number; userId: number | string }) {
    try {
      const resp = await database('posts').where({ id: postId, userId }).del()

      if (resp === 0) return { msgError: `Post não existe!` }

      return {
        resp,
      }
    } catch (e: any) {
      console.log(`Error ao tentar deletar o post`)
    }
  }

  public async updatePost({ postId, userId, title, description }: IUpdatePost) {
    try {
      const resp = await database('posts')
        .where({ id: postId, userId })
        .update({ title, description, createAt: dataFormatada })

      if (resp === 0) return { msgError: `Post não existe! Não foi possivel atualizar` }

      const post = await database('posts').where({ id: postId, userId }).select('*')

      return {
        post: post[0],
      }
    } catch (e: any) {
      console.log(`Error ao tentar atualizar Post`, e.message)
    }
  }
}

export default new PostModels()
