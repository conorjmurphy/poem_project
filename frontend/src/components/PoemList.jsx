import PoemCard from './PoemCard'
import PageHeader from './PageHeader'

function PoemList({ poems, loading, onViewPoem, onAuthorClick }) {
  if (loading) {
    return <div className="text-center py-8">Loading poems...</div>
  }

  if (poems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No poems yet. Create your first one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="All Poems"
        subtitle="A collection of heartfelt verses"
      />
      {poems.map((poem) => (
        <PoemCard
          key={poem.id}
          poem={poem}
          onViewPoem={onViewPoem}
          onAuthorClick={onAuthorClick}
          showAuthor={true}
        />
      ))}
    </div>
  )
}

export default PoemList