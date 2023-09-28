"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _CommentController = require('../controller/CommentController'); var _CommentController2 = _interopRequireDefault(_CommentController);
var _authmiddlewares = require('../middlewares/authmiddlewares'); var _authmiddlewares2 = _interopRequireDefault(_authmiddlewares);

const commentRouter = _express.Router.call(void 0, )

commentRouter.post('/posts/comment/:id', _authmiddlewares2.default, _CommentController2.default.CreateComment)
commentRouter.get('/posts/comment/:id', _CommentController2.default.GetCommentByIdPost)

exports. default = commentRouter
