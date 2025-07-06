import React, { useState } from 'react'
import axios from 'axios'

export default function PromptForm({ setImageUrl }) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/generate-diagram', { prompt })
      setImageUrl(res.data.imageUrl)
    } catch (err) {
      alert('Failed to generate diagram')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-24 p-3 border rounded"
        placeholder="Describe your diagram..."
        required
      ></textarea>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Diagram'}
      </button>
    </form>
  )
}
