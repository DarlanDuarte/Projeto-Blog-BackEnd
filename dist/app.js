"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _userroutes = require('./routes/user.routes'); var _userroutes2 = _interopRequireDefault(_userroutes);
var _authroutes = require('./routes/auth.routes'); var _authroutes2 = _interopRequireDefault(_authroutes);
var _postroutes = require('./routes/post.routes'); var _postroutes2 = _interopRequireDefault(_postroutes);
var _commentroutes = require('./routes/comment.routes'); var _commentroutes2 = _interopRequireDefault(_commentroutes);

class App {
  

  constructor() {
    this.app = _express2.default.call(void 0, )
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(_express2.default.json())
    this.app.use(_cors2.default.call(void 0, ))
    this.app.use('/uploads', _express2.default.static('/uploads'))
  }

  routes() {
    this.app.use(_userroutes2.default)
    this.app.use(_authroutes2.default)
    this.app.use(_postroutes2.default)
    this.app.use(_commentroutes2.default)
  }
}

exports. default = new App().app
