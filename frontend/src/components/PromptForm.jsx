import { useState } from 'react'
import '../styles/PromptForm.css'

export const PromptForm = ({ onSubmit, initialData = null, collections = [], tags = [] }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    content: '',
    collection_id: '',
    tags: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTagToggle = (tagId) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="prompt-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="6"
        />
      </div>

      <div className="form-group">
        <label htmlFor="collection">Collection</label>
        <select
          id="collection"
          name="collection_id"
          value={formData.collection_id || ''}
          onChange={handleChange}
        >
          <option value="">Select a collection</option>
          {collections.map(col => (
            <option key={col.id} value={col.id}>{col.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Tags</label>
        <div className="tags-list">
          {tags.map(tag => (
            <label key={tag.id} className="tag-checkbox">
              <input
                type="checkbox"
                checked={formData.tags.includes(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-submit">Submit</button>
    </form>
  )
}
