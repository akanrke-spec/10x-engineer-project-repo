import { useState, useCallback } from 'react'
import { collectionService } from '../services/collectionService'
import { useFetch } from './useFetch'

export const useCollections = () => {
  const { data: collections, loading, error } = useFetch(() => collectionService.getAllCollections())

  const createCollection = useCallback(async (collectionData) => {
    try {
      const newCollection = await collectionService.createCollection(collectionData)
      return newCollection
    } catch (err) {
      throw new Error(`Failed to create collection: ${err.message}`)
    }
  }, [])

  const updateCollection = useCallback(async (id, collectionData) => {
    try {
      const updated = await collectionService.updateCollection(id, collectionData)
      return updated
    } catch (err) {
      throw new Error(`Failed to update collection: ${err.message}`)
    }
  }, [])

  const deleteCollection = useCallback(async (id) => {
    try {
      await collectionService.deleteCollection(id)
    } catch (err) {
      throw new Error(`Failed to delete collection: ${err.message}`)
    }
  }, [])

  return {
    collections,
    loading,
    error,
    createCollection,
    updateCollection,
    deleteCollection,
  }
}
