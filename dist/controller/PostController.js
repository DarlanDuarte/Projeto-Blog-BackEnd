"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _PostModels = require('../models/PostModels'); var _PostModels2 = _interopRequireDefault(_PostModels);



class PostsController {
   async createPosts(req, res) {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).json(`Não Autorizado`)

      const { title, description } = req.body
      const { id } = req.userAuth
      let image = _optionalChain([req, 'access', _ => _.file, 'optionalAccess', _2 => _2.path])

      image = _optionalChain([image, 'optionalAccess', _3 => _3.split, 'call', _4 => _4('/'), 'access', _5 => _5.slice, 'call', _6 => _6(1, 3), 'access', _7 => _7.join, 'call', _8 => _8('/')])

      if (!title || !description) return res.status(400).json({ error: `Titulo ou Descrição não foram passados!` })
      if (!id) return res.status(400).json({ error: `Usuário do Post não existe!` })

      const post = await _PostModels2.default.createPosts({ title, description, id, image })

      if (_optionalChain([post, 'optionalAccess', _9 => _9.msgError])) return res.status(400).json(post.msgError)

      return res.status(201).json({ msg: `Post Criado com Sucesso!`, Post: _optionalChain([post, 'optionalAccess', _10 => _10.resp]) })
    } catch (e) {
      console.log(e.message)
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

   async getPostsUser(req, res) {
    try {
      const { id } = req.userAuth
      console.log(id)

      if (!id) return res.status(400).json(`Usuário não foi passado`)

      const postsUser = await _PostModels2.default.getPostsUser({ id })

      if (_optionalChain([postsUser, 'optionalAccess', _11 => _11.msgError])) return res.status(400).json(postsUser.msgError)

      const { ...posts } = _optionalChain([postsUser, 'optionalAccess', _12 => _12.posts]) 

      return res.status(200).json({ posts })
    } catch (e) {
      return res.status(500).json(`Error Interno do Servidor!`)
    }
  }

   async getAllPost(req, res) {
    try {
      const posts = await _PostModels2.default.getAllPosts()

      if (_optionalChain([posts, 'optionalAccess', _13 => _13.msgError])) return res.status(400).json(posts.msgError)

      const { ...allPosts } = _optionalChain([posts, 'optionalAccess', _14 => _14.resp])

      return res.status(200).json(allPosts)
    } catch (e) {
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }

   async getPostById(req, res) {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json(`Id do post não existe!`)

      const post = await _PostModels2.default.getPostById({ id })

      if (_optionalChain([post, 'optionalAccess', _15 => _15.error])) return res.status(400).json(_optionalChain([post, 'optionalAccess', _16 => _16.error]))

      const { id: postId, userId, title, description, createAt, image } = _optionalChain([post, 'optionalAccess', _17 => _17.resp]) 

      return res.status(200).json({ postId, userId, title, description, createAt, image })
    } catch (e) {
      console.log(e.message)
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }

   async deletePost(req, res) {
    try {
      const { authorization } = req.headers
      if (!authorization || authorization === '') return res.status(401).json(`Não Autorizado!`)

      const postId = +req.params.id
      const userId = req.userAuth.id

      if (!postId) return res.status(400).json(`Id do Post não foi passado!`)
      if (!userId) return res.status(400).json(`Id do usuário não foi passado!`)

      const post = await _PostModels2.default.deletePost({ postId, userId })

      if (_optionalChain([post, 'optionalAccess', _18 => _18.msgError])) return res.status(400).json(post.msgError)

      return res.status(200).json({ sucess: 'Post deletado com sucesso!' })
    } catch (e) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }

   async updatePost(req, res) {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).json(`Não Autorizado!`)

      const postId = +req.params.id
      const userId = req.userAuth.id
      const { title, description } = req.body

      if (!postId || !userId) return res.status(400).json(`Id não foi passado!`)
      if (!title || !description) return res.status(400).json(`titulo ou descrição não foram passadas!`)

      const post = await _PostModels2.default.updatePost({ postId, userId, title, description })

      return res.status(200).json({ success: `Post Atualizado com sucesso!`, post: _optionalChain([post, 'optionalAccess', _19 => _19.post]) })
    } catch (e) {
      return res.status(500).json(`Error interno no Servidor!`)
    }
  }
}

exports. default = new PostsController()
