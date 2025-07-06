import { useState } from 'react'
import { Copy } from 'lucide-react'

const samplePrompts = [
  "Generate a flowchart for Warehouse Management System",
"Client sends request to Server, and Server responds to Client",
"Router connects to a Switch, and Switch connects to PC1 and PC2",
"Make flowchart diagram for Airline Ticket Booking System",
"Make a diagram explaining Inventory Tracking System",
"Create a data flow diagram of Library Management System"


]

function SampleCard({ prompt }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      
    } catch (err) {
      alert('Failed to copy')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 relative border border-gray-200">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
        title="Copy prompt"
      >
        <Copy size={16} />
      </button>
      <pre className="whitespace-pre-wrap text-sm text-gray-800">{prompt}</pre>
    </div>
  )
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateDiagram = async () => {
    setLoading(true)
    setError(null)
    setImageUrl(null)

    try {
      const res = await fetch('http://localhost:5000/generate-diagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      if (!res.ok) throw new Error('Diagram generation failed')

      const data = await res.json()
      setImageUrl(data.imageUrl)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">🧠 Diagram Generator</h1>
        <nav className="space-x-4 text-sm">
          <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Docs</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
        </nav>
      </header>

      {/* Main Layout */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Panel */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Input Prompt</h2>
          <textarea
            className="w-full border rounded p-3 text-sm resize-none"
            rows={6}
            placeholder="e.g. A sends data to B"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={generateDiagram}
            disabled={loading || !prompt.trim()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition w-full"
          >
            {loading ? 'Generating...' : 'Generate Diagram'}
          </button>

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </section>

        {/* Right Panel */}
        <section className="bg-white rounded-xl shadow p-6 min-h-[300px] flex flex-col items-center justify-center">
          {imageUrl ? (
            <>
              <h3 className="font-medium mb-4">Generated Diagram</h3>
              <img
                src={imageUrl}
                alt="Generated Diagram"
                className="border rounded-lg shadow mb-3 max-w-full"
              />
              <a
                href={imageUrl}
                download="diagram.svg"
                className="text-blue-600 hover:underline"
              >
                ⬇️ Download Diagram
              </a>
            </>
          ) : (
            <p className="text-gray-400 italic">Your diagram will appear here.</p>
          )}
        </section>
      </main>

      {/* Sample Section */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">📚 Sample Diagrams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {samplePrompts.map((prompt, idx) => (
            <SampleCard key={idx} prompt={prompt} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
