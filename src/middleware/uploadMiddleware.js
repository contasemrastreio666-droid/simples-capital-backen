import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = path.resolve('uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${file.fieldname}-${unique}${path.extname(file.originalname)}`)
  },
})

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  if (allowed.includes(file.mimetype)) return cb(null, true)
  cb(new Error('Tipo de arquivo não permitido.'))
}

export const uploadCnh = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 },
}).fields([
  { name: 'cnhFront', maxCount: 1 },
  { name: 'cnhBack', maxCount: 1 },
])
