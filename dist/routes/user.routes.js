"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controller/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const userRouter = _express.Router.call(void 0, )

userRouter.get('/user', _UserController2.default.getUsers)
userRouter.post('/user', _UserController2.default.createUser)
userRouter.delete('/user/:id', _UserController2.default.deleteUser)
userRouter.put('/user/:id', _UserController2.default.updateUser)

exports. default = userRouter
