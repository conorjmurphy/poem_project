function PoemCard({ poem, onViewPoem, showAuthor = true, onAuthorClick }) {
  return (
    <div
      className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:bg-white/90"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 
          className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-purple-600 transition-colors duration-200 flex-1 font-serif"
          onClick={() => onViewPoem(poem)}
        >
          {poem.title}
        </h3>
      </div>
      {showAuthor && (
        <p className="text-purple-600 mb-4 text-lg">
          by{' '}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAuthorClick(poem.author)
            }}
            className="font-semibold text-purple-700 hover:text-blue-600 hover:underline cursor-pointer transition-colors duration-200"
          >
            {poem.author}
          </button>
        </p>
      )}
      <div 
        className="text-gray-700 leading-relaxed cursor-pointer hover:text-gray-900 transition-colors italic font-body"
        onClick={() => onViewPoem(poem)}
      >
        <p className="line-clamp-3 text-lg">
          "{poem.content.substring(0, 120)}..."
        </p>
        <p className="text-purple-500 text-sm mt-3 font-medium font-sans">Click to read more →</p>
      </div>
    </div>
  )
}

export default PoemCard