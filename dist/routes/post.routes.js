"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _PostController = require('../controller/PostController'); var _PostController2 = _interopRequireDefault(_PostController);
var _authmiddlewares = require('../middlewares/authmiddlewares'); var _authmiddlewares2 = _interopRequireDefault(_authmiddlewares);
var _uploadmiddlewares = require('../middlewares/uploadmiddlewares'); var _uploadmiddlewares2 = _interopRequireDefault(_uploadmiddlewares);
const postRouter = _express.Router.call(void 0, )

postRouter.post('/posts', _authmiddlewares2.default, _uploadmiddlewares2.default.single('image'), _PostController2.default.createPosts)

postRouter.get('/user/posts', _authmiddlewares2.default, _PostController2.default.getPostsUser)
postRouter.get('/posts', _PostController2.default.getAllPost)
postRouter.get('/posts/:id', _PostController2.default.getPostById)

postRouter.delete('/posts/:id', _authmiddlewares2.default, _PostController2.default.deletePost)
postRouter.put('/posts/:id', _authmiddlewares2.default, _PostController2.default.updatePost)

exports. default = postRouter
