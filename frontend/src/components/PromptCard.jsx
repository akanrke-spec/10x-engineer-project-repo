import '../styles/PromptCard.css'

export const PromptCard = ({ prompt, onEdit, onDelete, collectionName }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="prompt-card">
      <div className="prompt-card-header">
        <h3 className="prompt-title">{prompt.title}</h3>
        <div className="prompt-meta">
          <span className="prompt-date">{formatDate(prompt.created_at)}</span>
        </div>
      </div>

      {prompt.description && (
        <p className="prompt-description">{prompt.description}</p>
      )}

      <div className="prompt-content-preview">
        <p>{prompt.content.substring(0, 150)}...</p>
      </div>

      <div className="prompt-footer">
        <div className="prompt-info">
          {collectionName && (
            <span className="collection-badge">{collectionName}</span>
          )}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="prompt-tags">
              {prompt.tags.slice(0, 3).map(tag => (
                <span key={tag.id} className="tag">{tag.name}</span>
              ))}
              {prompt.tags.length > 3 && <span className="tag-more">+{prompt.tags.length - 3}</span>}
            </div>
          )}
        </div>
        <div className="prompt-actions">
          <button onClick={() => onEdit(prompt.id)} className="btn-icon btn-edit" title="Edit">✎</button>
          <button onClick={() => onDelete(prompt.id)} className="btn-icon btn-delete" title="Delete">🗑</button>
        </div>
      </div>
    </div>
  )
}
