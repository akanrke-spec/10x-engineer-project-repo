import '../styles/CollectionCard.css'

export const CollectionCard = ({ collection, promptCount = 0, onEdit, onDelete }) => {
  return (
    <div className="collection-card">
      <div className="collection-card-header">
        <h3 className="collection-title">{collection.name}</h3>
        <div className="collection-actions">
          <button onClick={() => onEdit(collection.id)} className="btn-icon btn-edit" title="Edit">✎</button>
          <button onClick={() => onDelete(collection.id)} className="btn-icon btn-delete" title="Delete">🗑</button>
        </div>
      </div>

      {collection.description && (
        <p className="collection-description">{collection.description}</p>
      )}

      <div className="collection-stats">
        <span className="prompt-count">{promptCount} prompts</span>
      </div>
    </div>
  )
}
