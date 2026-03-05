import apiClient from './api'

export const promptService = {
  async getAllPrompts(params = {}) {
    const response = await apiClient.get('/prompts', { params })
    return response.data
  },

  async getPromptById(id) {
    const response = await apiClient.get(`/prompts/${id}`)
    return response.data
  },

  async createPrompt(promptData) {
    const response = await apiClient.post('/prompts', promptData)
    return response.data
  },

  async updatePrompt(id, promptData) {
    const response = await apiClient.put(`/prompts/${id}`, promptData)
    return response.data
  },

  async deletePrompt(id) {
    const response = await apiClient.delete(`/prompts/${id}`)
    return response.data
  },

  async searchPrompts(query) {
    const response = await apiClient.get('/prompts', { params: { search: query } })
    return response.data
  },

  async filterPrompts(collectionId) {
    const response = await apiClient.get('/prompts', { params: { collection_id: collectionId } })
    return response.data
  }
}