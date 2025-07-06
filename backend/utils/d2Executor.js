import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { promisify } from 'util'

const execPromise = promisify(exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const diagramDir = path.join(__dirname, '..', 'diagrams')

export async function generateDiagramFromPrompt(d2Code) {
  const fileName = uuidv4()
  const d2FilePath = path.join(diagramDir, `${fileName}.d2`)
  const svgFilePath = path.join(diagramDir, `${fileName}.svg`)

  // ✅ Save the D2 code to a .d2 file
  fs.writeFileSync(d2FilePath, d2Code)

  // ✅ Use D2 CLI to convert .d2 → .svg
  await execPromise(`d2 "${d2FilePath}" "${svgFilePath}"`)

  return fileName
}
