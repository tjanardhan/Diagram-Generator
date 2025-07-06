// backend/routes/generate.js
import express from 'express'
import { handleGenerateDiagram } from '../controllers/diagramController.js'

const router = express.Router()
router.post('/', handleGenerateDiagram)

export default router
