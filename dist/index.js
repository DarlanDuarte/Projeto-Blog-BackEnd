"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const port = process.env.PORT || 8080

_app2.default.listen(port, () => {
  console.log(`Server is Running Successful on Port: ${port}`)
})
