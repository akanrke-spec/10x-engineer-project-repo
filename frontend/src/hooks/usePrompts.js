import { useState, useCallback } from 'react'
import { promptService } from '../services/promptService'
import { useFetch } from './useFetch'

export const usePrompts = () => {
  const { data: prompts, loading, error } = useFetch(() => promptService.getAllPrompts())
  const [searchResults, setSearchResults] = useState(null)

  const createPrompt = useCallback(async (promptData) => {
    try {
      const newPrompt = await promptService.createPrompt(promptData)
      return newPrompt
    } catch (err) {
      throw new Error(`Failed to create prompt: ${err.message}`)
    }
  }, [])

  const updatePrompt = useCallback(async (id, promptData) => {
    try {
      const updated = await promptService.updatePrompt(id, promptData)
      return updated
    } catch (err) {
      throw new Error(`Failed to update prompt: ${err.message}`)
    }
  }, [])

  const deletePrompt = useCallback(async (id) => {
    try {
      await promptService.deletePrompt(id)
    } catch (err) {
      throw new Error(`Failed to delete prompt: ${err.message}`)
    }
  }, [])

  const searchPrompts = useCallback(async (query) => {
    try {
      const results = await promptService.searchPrompts(query)
      setSearchResults(results)
      return results
    } catch (err) {
      throw new Error(`Failed to search prompts: ${err.message}`)
    }
  }, [])

  const filterPrompts = useCallback(async (filters) => {
    try {
      const results = await promptService.filterPrompts(filters)
      setSearchResults(results)
      return results
    } catch (err) {
      throw new Error(`Failed to filter prompts: ${err.message}`)
    }
  }, [])

  return {
    prompts,
    loading,
    error,
    searchResults,
    createPrompt,
    updatePrompt,
    deletePrompt,
    searchPrompts,
    filterPrompts,
  }
}
