"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connection = require('../database/connection'); var _connection2 = _interopRequireDefault(_connection);
var _formatDate = require('../utils/formatDate'); var _formatDate2 = _interopRequireDefault(_formatDate);


class PostModels {
   async createPosts({
    title,
    description,
    id,
    image,
  }




) {
    try {
      const result = await _connection2.default
        .table('posts')
        .insert({ title, description, userId: id, createAt: _formatDate2.default, image })

      if (result.length === 0) return { msgError: `Error ao Criar Post` }

      const resp = await _connection2.default.table('posts').where({ userId: id }).select('*')

      return {
        resp: resp,
      }
    } catch (e) {
      console.log(`Error ao tentar criar Post`)
    }
  }

   async getPostsUser({ id }) {
    try {
      const posts = await _connection2.default.call(void 0, 'posts').where({ userId: id }).select('*')

      if (posts.length === 0) return { msgError: `Nenhum Post Encontrado!` }

      return {
        posts,
      }
    } catch (e) {
      console.log(`Error ao tentar pegar Post de Usuário!`)
    }
  }

   async getAllPosts() {
    try {
      const resp = await _connection2.default.call(void 0, 'posts').select('*')

      if (resp.length === 0) return { msgError: `Nenhum Post foi encontrado` }

      return {
        resp,
      }
    } catch (e) {
      console.log(`Error ao tentar pegar todos os posts!`, e.message)
    }
  }

   async getPostById({ id }) {
    try {
      const resp = await _connection2.default.call(void 0, 'posts').where({ id }).select('*')
      console.log(resp)

      if (resp.length === 0) return { error: `Nenhum Post Encontrado!` }

      return {
        resp: resp[0],
      }
    } catch (e) {
      console.log(e.message)
    }
  }

   async deletePost({ postId, userId }) {
    try {
      const resp = await _connection2.default.call(void 0, 'posts').where({ id: postId, userId }).del()

      if (resp === 0) return { msgError: `Post não existe!` }

      return {
        resp,
      }
    } catch (e) {
      console.log(`Error ao tentar deletar o post`)
    }
  }

   async updatePost({ postId, userId, title, description }) {
    try {
      const resp = await _connection2.default.call(void 0, 'posts')
        .where({ id: postId, userId })
        .update({ title, description, createAt: _formatDate2.default })

      if (resp === 0) return { msgError: `Post não existe! Não foi possivel atualizar` }

      const post = await _connection2.default.call(void 0, 'posts').where({ id: postId, userId }).select('*')

      return {
        post: post[0],
      }
    } catch (e) {
      console.log(`Error ao tentar atualizar Post`, e.message)
    }
  }
}

exports. default = new PostModels()
