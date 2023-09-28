"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connection = require('../database/connection'); var _connection2 = _interopRequireDefault(_connection);


class CommentModels {
   async CreateComment({ comment, userId, postId, usuario }) {
    try {
      const existPostId = await _connection2.default.call(void 0, 'posts').where({ id: postId }).select('*')
      console.log(existPostId)

      if (existPostId.length === 0) return { NoExist: `Post do comentário não existe!` }

      const result = await _connection2.default.call(void 0, 'comments').insert({ comment, userId, postId, usuario })

      if (result.length === 0) return { error: `Não foi possivel criar um Comentário!` }

      const resp = await _connection2.default.call(void 0, 'comments').where({ postId }).select('*')

      return {
        resp,
      }
    } catch (e) {
      console.log(e.message)
    }
  }

   async GetCommentByIdPost({ postId }) {
    try {
      const resp = await _connection2.default.call(void 0, 'comments').where({ postId }).select('*')

      if (resp.length === 0) return { error: `PostId não existe!` }

      return {
        resp,
      }
    } catch (e) {
      console.log(e.message)
    }
  }
}

exports. default = new CommentModels()
