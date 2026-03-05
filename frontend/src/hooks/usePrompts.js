import { useState, useCallback } from 'react'
import { promptService } from '../services/promptService'
import { useFetch } from './useFetch'

export const usePrompts = () => {
  // Memoized fetch function
  const fetchPrompts = useCallback(() => promptService.getAllPrompts(), [])

  const { data: prompts, loading, error } = useFetch(fetchPrompts)
  const [searchResults, setSearchResults] = useState([])

  const createPrompt = useCallback(async (promptData) => {
    const newPrompt = await promptService.createPrompt(promptData)
    return newPrompt
  }, [])

  const updatePrompt = useCallback(async (id, promptData) => {
    const updated = await promptService.updatePrompt(id, promptData)
    return updated
  }, [])

  const deletePrompt = useCallback(async (id) => {
    await promptService.deletePrompt(id)
  }, [])

  const searchPrompts = useCallback(async (query) => {
    const results = await promptService.searchPrompts(query)
    setSearchResults(results || [])
    return results
  }, [])

  const filterPrompts = useCallback(async (collectionId) => {
    const results = await promptService.filterPrompts(collectionId)
    setSearchResults(results || [])
    return results
  }, [])

  return {
    prompts: prompts || [],
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