import api from '@/plugins/axios'

export const getAuthPermission = async () => {
  try {
    const response = await api.get(`/permissions`)
    return response.data
  } catch(error) {
    throw error
  }
}