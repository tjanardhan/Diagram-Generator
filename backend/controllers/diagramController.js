import { generateDiagramFromPrompt } from '../utils/d2Executor.js'
import { promptToD2 } from '../utils/promptToD2.js'
//import promptToD2 from '../utils/promptToD2.js'
import { exec } from 'child_process'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export const handleGenerateDiagram = async (req, res) => {
  try {
    const { prompt } = req.body
    console.log('🔥 Prompt received:', prompt)

    const d2Code = await promptToD2(prompt)  // 👈 MUST await this
    const id = await generateDiagramFromPrompt(d2Code)

    const imageUrl = `http://localhost:5000/diagrams/${id}.svg`
    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error('💥 Diagram generation failed:', error)
    res.status(500).json({ error: 'Failed to generate diagram' })
  }
}

const generateDiagram = async (req, res) => {
  const { prompt } = req.body
  const id = uuidv4()

  const svgPath = path.join('diagrams', `${id}.svg`)
  const pngPath = path.join('diagrams', `${id}.png`)
  const d2Path = path.join('diagrams', `${id}.d2`)

  try {
    // Step 1: Convert prompt to D2
    const d2Code = await promptToD2(prompt)
    await fs.writeFile(d2Path, d2Code)

    // Step 2: Use D2 to generate SVG
    await new Promise((resolve, reject) => {
      exec(`d2 "${d2Path}" "${svgPath}"`, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })

    // ✅ Step 3: Convert SVG → PNG
    const svgBuffer = await fs.readFile(svgPath)
    await sharp(svgBuffer).png().toFile(pngPath)

    res.json({ imageUrl: `http://localhost:5000/diagrams/${id}.png` })

  } catch (error) {
    console.error('💥 Diagram generation failed:', error)
    res.status(500).json({ error: 'Failed to generate diagram.' })
  }
}
