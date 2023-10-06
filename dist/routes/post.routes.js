"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _PostController = require('../controller/PostController'); var _PostController2 = _interopRequireDefault(_PostController);
var _authmiddlewares = require('../middlewares/authmiddlewares'); var _authmiddlewares2 = _interopRequireDefault(_authmiddlewares);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _corsmiddlewares = require('../middlewares/corsmiddlewares'); var _corsmiddlewares2 = _interopRequireDefault(_corsmiddlewares);

const postRouter = _express.Router.call(void 0, )

const storage = _multer2.default.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/')
  },

  filename(req, file, cb) {
    cb(null, new Date().getTime() + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = _multer2.default.call(void 0, {
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
})

postRouter.use(_corsmiddlewares2.default)

postRouter.post('/posts', _authmiddlewares2.default, upload.single('image'), _PostController2.default.createPosts)

postRouter.get('/user/posts', _authmiddlewares2.default, _PostController2.default.getPostsUser)
postRouter.get('/posts', _PostController2.default.getAllPost)
postRouter.get('/posts/:id', _PostController2.default.getPostById)

postRouter.delete('/posts/:id', _authmiddlewares2.default, _PostController2.default.deletePost)
postRouter.put('/posts/:id', _authmiddlewares2.default, _PostController2.default.updatePost)

exports. default = postRouter
