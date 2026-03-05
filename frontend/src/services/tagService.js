import apiClient from './api'

export const tagService = {
  async getTagsByPrompt(promptId) {
    const response = await apiClient.get(`/prompts/${promptId}/tags`)
    return response.data
  },

  async addTagsToPrompt(promptId, tags) {
    const response = await apiClient.post(`/prompts/${promptId}/tags`, { tags })
    return response.data
  },

  async removeTagFromPrompt(promptId, tagName) {
    const response = await apiClient.delete(`/prompts/${promptId}/tags/${tagName}`)
    return response.data
  },

  async searchPromptsByTag(tagName) {
    const response = await apiClient.get(`/tags/${tagName}/prompts`)
    return response.data
  }
}