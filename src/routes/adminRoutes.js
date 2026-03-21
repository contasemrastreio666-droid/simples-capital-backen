import { Router } from 'express'
import { loginAdmin, listLeadsAdmin } from '../controllers/adminController.js'
import { updateLeadStatus, deleteLead } from '../controllers/leadController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/login', loginAdmin)
router.get('/leads', authMiddleware, listLeadsAdmin)
router.patch('/leads/:id/status', authMiddleware, updateLeadStatus)
router.delete('/leads/:id', authMiddleware, deleteLead)

export default router
