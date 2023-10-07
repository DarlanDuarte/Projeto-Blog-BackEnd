import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

/* const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/')
  },

  filename(req, file, cb) {
    cb(null, new Date().getTime() + file.originalname)
  },
}) */

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
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

const upload = multer({
  storage: multer.memoryStorage(),
})

export default upload
