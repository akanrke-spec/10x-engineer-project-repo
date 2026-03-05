import { useCallback } from 'react'
import { collectionService } from '../services/collectionService'
import { useFetch } from './useFetch'

export const useCollections = () => {
  // Memoized fetch function
  const fetchCollections = useCallback(() => collectionService.getAllCollections(), [])

  const { data: collections, loading, error } = useFetch(fetchCollections)

  const createCollection = useCallback(async (collectionData) => {
    const newCollection = await collectionService.createCollection(collectionData)
    return newCollection
  }, [])

  const updateCollection = useCallback(async (id, collectionData) => {
    const updated = await collectionService.updateCollection(id, collectionData)
    return updated
  }, [])

  const deleteCollection = useCallback(async (id) => {
    await collectionService.deleteCollection(id)
  }, [])

  return {
    collections: collections || [],
    loading,
    error,
    createCollection,
    updateCollection,
    deleteCollection,
  }
}