import { Router } from 'express'
import { createLead } from '../controllers/leadController.js'
import { uploadCnh } from '../middleware/uploadMiddleware.js'

const router = Router()
router.post('/', uploadCnh, createLead)
export default router
