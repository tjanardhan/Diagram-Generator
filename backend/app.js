// backend/app.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import generateRoute from './routes/generate.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Setup
const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/diagrams', express.static('diagrams'))
// Static folder to serve generated SVGs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/diagrams', express.static(path.join(__dirname, 'diagrams')))

// Routes
app.use('/generate-diagram', generateRoute)

const PORT = 5000
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))
