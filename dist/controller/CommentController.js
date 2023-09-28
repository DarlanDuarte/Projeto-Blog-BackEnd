"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _CommentModels = require('../models/CommentModels'); var _CommentModels2 = _interopRequireDefault(_CommentModels);

class Comments {
   async CreateComment(req, res) {
    try {
      const { comment } = req.body
      const { id: userId, name: usuario } = req.userAuth
      const { id: postId } = req.params

      if (!comment) return res.status(400).json(`Comentário é obrigatorio!`)
      if (!userId) return res.status(400).json(`Usuário não existe!`)
      if (!postId) return res.status(400).json(`Id do Post não foi passado`)

      const comentario = await _CommentModels2.default.CreateComment({ comment, userId, postId, usuario })

      if (_optionalChain([comentario, 'optionalAccess', _ => _.NoExist])) return res.status(400).json(comentario.NoExist)
      if (_optionalChain([comentario, 'optionalAccess', _2 => _2.error])) return res.status(400).json(comentario.error)

      return res.status(201).json({ message: `Comentário criado com sucesso!`, comment: _optionalChain([comentario, 'optionalAccess', _3 => _3.resp]) })
    } catch (e) {
      console.log(e.message)
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }

   async GetCommentByIdPost(req, res) {
    try {
      const { id: postId } = req.params

      if (!postId) return res.status(400).json(`Post não existe!`)

      const comment = await _CommentModels2.default.GetCommentByIdPost({ postId })

      if (_optionalChain([comment, 'optionalAccess', _4 => _4.error])) return res.status(400).json(comment.error)

      const { ...resp } = _optionalChain([comment, 'optionalAccess', _5 => _5.resp])

      const comentarios = Object.values(resp)

      return res.status(200).json(comentarios)
    } catch (e) {
      console.log(e.message)
      return res.status(500).json(`Error Interno no Servidor!`)
    }
  }
}

exports. default = new Comments()
