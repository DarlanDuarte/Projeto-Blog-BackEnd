"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AuthController = require('../controller/AuthController'); var _AuthController2 = _interopRequireDefault(_AuthController);
var _authmiddlewares = require('../middlewares/authmiddlewares'); var _authmiddlewares2 = _interopRequireDefault(_authmiddlewares);

const authRouter = _express.Router.call(void 0, )

authRouter.post('/login', _AuthController2.default.Login)

authRouter.get('/profile', _authmiddlewares2.default, _AuthController2.default.getProfile)

exports. default = authRouter
