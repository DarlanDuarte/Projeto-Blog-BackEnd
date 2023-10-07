"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

/* const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/')
  },

  filename(req, file, cb) {
    cb(null, new Date().getTime() + file.originalname)
  },
}) */

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

/* const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
}) */

const upload = _multer2.default.call(void 0, {
  storage: _multer2.default.memoryStorage(),
})

exports. default = upload
