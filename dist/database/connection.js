"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _knex = require('knex'); var _knex2 = _interopRequireDefault(_knex);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config()

const port = process.env.DATABASE_PORT 

const database = _knex2.default.call(void 0, {
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    port: port,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  },
})

exports. default = database
