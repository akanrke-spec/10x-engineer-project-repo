import { useState, useMemo } from 'react'
import { PromptCard } from '../components/PromptCard'
import { PromptForm } from '../components/PromptForm'
import { FilterBar } from '../components/FilterBar'
import { usePrompts } from '../hooks/usePrompts'
import { useCollections } from '../hooks/useCollections'
import '../styles/PromptsPage.css'

export const PromptsPage = () => {
  const { prompts, loading: promptsLoading, error: promptsError, searchPrompts, filterPrompts, deletePrompt } = usePrompts()
  const { collections, loading: collectionsLoading } = useCollections()
  
  const [showForm, setShowForm] = useState(false)
  const [filteredPrompts, setFilteredPrompts] = useState(prompts)
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)

  // Update filtered prompts when prompts change
  useMemo(() => {
    setFilteredPrompts(prompts)
  }, [prompts])

  const getCollectionName = (collectionId) => {
    return collections?.find(c => c.id === collectionId)?.name
  }

  const handleSearch = async (query) => {
    try {
      const results = await searchPrompts(query)
      setFilteredPrompts(results)
      setSelectedCollectionId(null)
    } catch (err) {
      console.error('Search error:', err)
    }
  }

  const handleFilterByCollection = async (collectionId) => {
    try {
      const results = await filterPrompts({ collection_id: collectionId })
      setFilteredPrompts(results)
      setSelectedCollectionId(collectionId)
    } catch (err) {
      console.error('Filter error:', err)
    }
  }

  const handleClearFilters = () => {
    setFilteredPrompts(prompts)
    setSelectedCollectionId(null)
  }

  const handleCreate = async (formData) => {
    try {
      await usePrompts().createPrompt(formData)
      setShowForm(false)
      // Prompts will update automatically via hook
    } catch (err) {
      console.error('Error creating prompt:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        await deletePrompt(id)
      } catch (err) {
        console.error('Error deleting prompt:', err)
      }
    }
  }

  if (promptsLoading || collectionsLoading) {
    return <div className="loading">Loading prompts...</div>
  }

  if (promptsError) {
    return <div className="error">Error: {promptsError}</div>
  }

  return (
    <div className="prompts-page">
      <div className="page-header">
        <h1>Prompts</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Prompt'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>Create New Prompt</h2>
          <PromptForm onSubmit={handleCreate} collections={collections || []} />
        </div>
      )}

      <FilterBar
        collections={collections || []}
        onSearch={handleSearch}
        onFilterByCollection={handleFilterByCollection}
        onClearFilters={handleClearFilters}
      />

      <div className="prompts-stats">
        <p>Showing <strong>{filteredPrompts?.length || 0}</strong> prompts</p>
      </div>

      <div className="prompts-grid">
        {filteredPrompts && filteredPrompts.length > 0 ? (
          filteredPrompts.map(prompt => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              collectionName={getCollectionName(prompt.collection_id)}
              onEdit={() => console.log('Edit:', prompt.id)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No prompts found. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
