import apiClient from './api'

export const promptService = {
  async getAllPrompts() {
    const response = await apiClient.get('/prompts')
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
    const response = await apiClient.get('/prompts/search', {
      params: { query }
    })
    return response.data
  },

  async filterPrompts(filters) {
    const response = await apiClient.get('/prompts/filter', {
      params: filters
    })
    return response.data
  }
}
