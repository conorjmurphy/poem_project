import { useState, useEffect } from 'react'
import PoemList from './components/PoemList'
import CreatePoem from './components/CreatePoem'
import ViewPoem from './components/ViewPoem'
import AuthorPoemList from './components/AuthorPoemList'

function App() {
  const [currentView, setCurrentView] = useState('list') // 'list', 'create', 'view', 'author'
  const [poems, setPoems] = useState([])
  const [selectedPoem, setSelectedPoem] = useState(null)
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [loading, setLoading] = useState(false)

  // API base URL
  const API_BASE = 'http://localhost:8080/api'

  // Fetch poems from API
  const fetchPoems = async () => {
    setLoading(true)
    try {
      console.log('Fetching poems from:', `${API_BASE}/poems`)
      const response = await fetch(`${API_BASE}/poems`)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Fetched poems:', data)
      setPoems(data)
    } catch (error) {
      console.error('Error fetching poems:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch poems by author
  const fetchPoemsByAuthor = async (authorName) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/poems/author/${encodeURIComponent(authorName)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setPoems(data)
      setSelectedAuthor(authorName)
    } catch (error) {
      console.error('Error fetching poems by author:', error)
    } finally {
      setLoading(false)
    }
  }

  // Create new poem
  const createPoem = async (poemData) => {
    try {
      const response = await fetch(`${API_BASE}/poems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(poemData),
      })
      if (response.ok) {
        fetchPoems() // Refresh the list
        setCurrentView('list')
      }
    } catch (error) {
      console.error('Error creating poem:', error)
    }
  }

  // Load poems on component mount
  useEffect(() => {
    fetchPoems()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-serif">
              Poetry Collection
            </h1>
            <p className="text-purple-600/70 text-sm italic mt-1 font-body">Where words dance and emotions flow</p>
          </div>
          <nav className="mt-6 flex space-x-2">
            <button
              onClick={() => setCurrentView('list')}
              className={`px-6 py-3 rounded-full cursor-pointer transition-all duration-200 font-medium ${
                currentView === 'list'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100/50 border border-purple-200'
              }`}
            >
              All Poems
            </button>
            <button
              onClick={() => setCurrentView('create')}
              className={`px-6 py-3 rounded-full cursor-pointer transition-all duration-200 font-medium ${
                currentView === 'create'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100/50 border border-purple-200'
              }`}
            >
              Create New
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentView === 'list' && (
          <PoemList
            poems={poems}
            loading={loading}
            onViewPoem={(poem) => {
              setSelectedPoem(poem)
              setCurrentView('view')
            }}
            onAuthorClick={(authorName) => {
              fetchPoemsByAuthor(authorName)
              setCurrentView('author')
            }}
          />
        )}
        {currentView === 'create' && <CreatePoem onSubmit={createPoem} />}
        {currentView === 'view' && selectedPoem && (
          <ViewPoem
            poem={selectedPoem}
            onBack={() => setCurrentView('list')}
          />
        )}
        {currentView === 'author' && (
          <AuthorPoemList
            poems={poems}
            loading={loading}
            authorName={selectedAuthor}
            onViewPoem={(poem) => {
              setSelectedPoem(poem)
              setCurrentView('view')
            }}
            onBack={() => {
              fetchPoems()
              setCurrentView('list')
            }}
          />
        )}
      </main>
    </div>
  )
}

export default App
