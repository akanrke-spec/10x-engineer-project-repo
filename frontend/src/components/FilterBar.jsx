import { useState } from 'react'
import '../styles/FilterBar.css'

export const FilterBar = ({ collections = [], onSearch, onFilterByCollection, onClearFilters }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  const handleCollectionFilter = (e) => {
    const collectionId = e.target.value
    setSelectedCollection(collectionId)
    if (collectionId) {
      onFilterByCollection(collectionId)
    } else {
      onClearFilters()
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    setSelectedCollection('')
    onClearFilters()
  }

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts by title or description..."
            className="search-input"
          />
          <button type="submit" className="btn-search">Search</button>
        </form>
      </div>

      <div className="filter-section">
        <select
          value={selectedCollection}
          onChange={handleCollectionFilter}
          className="filter-select"
        >
          <option value="">All Collections</option>
          {collections.map(col => (
            <option key={col.id} value={col.id}>{col.name}</option>
          ))}
        </select>
      </div>

      {(searchQuery || selectedCollection) && (
        <button onClick={handleClear} className="btn-clear">Clear Filters</button>
      )}
    </div>
  )
}
