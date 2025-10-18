import { useState } from 'react'
import PageHeader from './PageHeader'

function CreatePoem({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.author && formData.content) {
      onSubmit(formData)
      setFormData({ title: '', author: '', content: '' })
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-100">
      <PageHeader
        title="Create New Poem"
        subtitle="Let your creativity flow onto the page"
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-3">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              placeholder="Enter a beautiful title..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-3">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              placeholder="Your name..."
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-purple-700 mb-3">
            Your Poem
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm leading-relaxed resize-none"
            placeholder="Let your words flow here...&#10;&#10;Write verse by verse,&#10;line by line,&#10;pouring your heart onto the page..."
            required
          />
          <p className="text-purple-600/60 text-xs mt-2 italic">
            Tip: Press Enter to create new lines in your poem
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Publish Your Poem
        </button>
      </form>
    </div>
  )
}

export default CreatePoem