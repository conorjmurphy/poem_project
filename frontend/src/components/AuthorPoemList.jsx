import PoemCard from './PoemCard'
import PageHeader from './PageHeader'

function AuthorPoemList({ poems, loading, authorName, onViewPoem, onBack }) {
  if (loading) {
    return <div className="text-center py-8 text-purple-600 font-sans">Loading poems...</div>
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-purple-600 hover:text-blue-600 cursor-pointer transition-colors font-medium mb-4 font-sans"
      >
        ← Back to all poems
      </button>
      
      <PageHeader
        title={`Poems by ${authorName}`}
        subtitle={`${poems.length} poem${poems.length !== 1 ? 's' : ''} in this collection`}
      />
      
      {poems.length === 0 ? (
        <div className="text-center py-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-12">
          <p className="text-purple-600/70 font-body italic text-lg">No poems found by this author.</p>
        </div>
      ) : (
        <>
          {poems.map((poem) => (
            <PoemCard
              key={poem.id}
              poem={poem}
              onViewPoem={onViewPoem}
              showAuthor={false}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default AuthorPoemList