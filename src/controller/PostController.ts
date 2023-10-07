import { Request, Response } from 'express'
import PostModels from '../models/PostModels'
import { IPosts, IUser } from '../interfaces/interfaces'
import { google } from 'googleapis'
import { Readable } from 'stream'

class PostsController {
  public async createPosts(req: Request, res: Response) {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).json(`Não Autorizado`)

      const { title, description } = req.body
      const { id } = req.userAuth
      /* let image = req.file?.path */
      console.log(req.file)

      const GOOGLE_API_ID = '1MM3LyPiBi3h7twCKfdFNA20rzB-PhTiw'

      const originalName: string | undefined = req.file?.originalname
      const fileName = `${new Date().getTime()}_${originalName}`

      if (!req.file) {
        return res.status(400).json({ error: `Imagem não foi passada!` })
      }

      const auth = new google.auth.GoogleAuth({
        keyFile: './googledrive.json',
        scopes: ['https://www.googleapis.com/auth/drive'],
      })

      const driveServices = google.drive({
        version: 'v3',
        auth,
      })

      const media = {
        mimeType: req.file?.mimetype,
        body: Readable.from(req.file?.buffer),
      }

      const response = await driveServices.files.create({
        requestBody: {
          name: fileName,
          parents: [GOOGLE_API_ID],
        },
        media: media,
      })

      console.log(response.data)

      const imageId = response.data.id

      const image = `https://drive.google.com/uc?id=${imageId}`

      if (!title || !description) return res.status(400).json({ error: `Titulo ou Descrição não foram passados!` })
      if (!id) return res.status(400).json({ error: `Usuário do Post não existe!` })

      const post = await PostModels.createPosts({ title, description, id, image })

      if (post?.msgError) return res.status(400).json(post.msgError)

      return res.status(201).json({ msg: `Post Criado com Sucesso!`, Post: post?.resp })
    } catch (e: any) {
      console.log(e.message)
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

  public async getPostsUser(req: Request, res: Response) {
    try {
      const { id } = req.userAuth
      console.log(id)

      if (!id) return res.status(400).json(`Usuário não foi passado`)

      const postsUser = await PostModels.getPostsUser({ id })

      if (postsUser?.msgError) return res.status(400).json(postsUser.msgError)

      const { ...posts } = postsUser?.posts as IPosts[]

      return res.status(200).json({ posts })
    } catch (e: any) {
      return res.status(500).json(`Error Interno do Servidor!`)
    }
  }

  public async getAllPost(req: Request, res: Response) {
    try {
      const posts = await PostModels.getAllPosts()

      if (posts?.msgError) return res.status(400).json(posts.msgError)

      const { ...allPosts } = posts?.resp

      return res.status(200).json(allPosts)
    } catch (e: any) {
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }

  public async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json(`Id do post não existe!`)

      const post = await PostModels.getPostById({ id })

      if (post?.error) return res.status(400).json(post?.error)

      const { id: postId, userId, title, description, createAt, image } = post?.resp as IPosts

      return res.status(200).json({ postId, userId, title, description, createAt, image })
    } catch (e: any) {
      console.log(e.message)
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }

  public async deletePost(req: Request, res: Response) {
    try {
      const { authorization } = req.headers
      if (!authorization || authorization === '') return res.status(401).json(`Não Autorizado!`)

      const postId = +req.params.id
      const userId = req.userAuth.id

      if (!postId) return res.status(400).json(`Id do Post não foi passado!`)
      if (!userId) return res.status(400).json(`Id do usuário não foi passado!`)

      const post = await PostModels.deletePost({ postId, userId })

      if (post?.msgError) return res.status(400).json(post.msgError)

      return res.status(200).json({ sucess: 'Post deletado com sucesso!' })
    } catch (e: any) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

  public async updatePost(req: Request, res: Response) {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).json(`Não Autorizado!`)

      const postId = +req.params.id
      const userId = req.userAuth.id
      const { title, description } = req.body

      if (!postId || !userId) return res.status(400).json(`Id não foi passado!`)
      if (!title || !description) return res.status(400).json(`titulo ou descrição não foram passadas!`)

      const post = await PostModels.updatePost({ postId, userId, title, description })

      return res.status(200).json({ success: `Post Atualizado com sucesso!`, post: post?.post })
    } catch (e: any) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }
}

export default new PostsController()
