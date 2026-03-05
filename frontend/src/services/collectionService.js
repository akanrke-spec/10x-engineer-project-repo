import apiClient from './api'

export const collectionService = {
  async getAllCollections() {
    const response = await apiClient.get('/collections')
    return response.data
  },

  async getCollectionById(id) {
    const response = await apiClient.get(`/collections/${id}`)
    return response.data
  },

  async createCollection(collectionData) {
    const response = await apiClient.post('/collections', collectionData)
    return response.data
  },

  async updateCollection(id, collectionData) {
    const response = await apiClient.put(`/collections/${id}`, collectionData)
    return response.data
  },

  async deleteCollection(id) {
    const response = await apiClient.delete(`/collections/${id}`)
    return response.data
  }
}