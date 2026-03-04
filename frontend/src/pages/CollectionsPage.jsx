import { useState } from 'react'
import { CollectionCard } from '../components/CollectionCard'
import { CollectionForm } from '../components/CollectionForm'
import { useCollections } from '../hooks/useCollections'
import { usePrompts } from '../hooks/usePrompts'
import '../styles/CollectionsPage.css'

export const CollectionsPage = () => {
  const { collections, loading: collectionsLoading, error: collectionsError, createCollection, deleteCollection } = useCollections()
  const { prompts } = usePrompts()
  const [showForm, setShowForm] = useState(false)

  const getPromptCountForCollection = (collectionId) => {
    return prompts?.filter(p => p.collection_id === collectionId).length || 0
  }

  const handleCreate = async (formData) => {
    try {
      await createCollection(formData)
      setShowForm(false)
    } catch (err) {
      console.error('Error creating collection:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await deleteCollection(id)
      } catch (err) {
        console.error('Error deleting collection:', err)
      }
    }
  }

  if (collectionsLoading) {
    return <div className="loading">Loading collections...</div>
  }

  if (collectionsError) {
    return <div className="error">Error: {collectionsError}</div>
  }

  return (
    <div className="collections-page">
      <div className="page-header">
        <h1>Collections</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Collection'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>Create New Collection</h2>
          <CollectionForm onSubmit={handleCreate} />
        </div>
      )}

      <div className="collections-grid">
        {collections && collections.length > 0 ? (
          collections.map(collection => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              promptCount={getPromptCountForCollection(collection.id)}
              onEdit={() => console.log('Edit:', collection.id)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No collections yet. Create one to organize your prompts!</p>
          </div>
        )}
      </div>
    </div>
  )
}
