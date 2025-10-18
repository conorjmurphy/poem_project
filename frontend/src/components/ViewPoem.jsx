function ViewPoem({ poem, onBack }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-purple-100">
      <button
        onClick={onBack}
        className="mb-6 text-purple-600 hover:text-blue-600 flex items-center cursor-pointer transition-colors font-medium"
      >
        ← Back to collection
      </button>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 font-serif">
          {poem.title}
        </h1>
        <p className="text-xl text-purple-600 font-medium italic font-body">by {poem.author}</p>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl border-l-4 border-purple-400">
          <pre className="whitespace-pre-wrap text-gray-800 font-body text-lg leading-relaxed">
            {poem.content}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default ViewPoem