function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 font-serif">
        {title}
      </h2>
      {subtitle && (
        <p className="text-purple-600/70 italic font-body">{subtitle}</p>
      )}
    </div>
  )
}

export default PageHeader