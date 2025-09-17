import api from '@/plugins/axios'

export const verifyToken = async (payload) => {
  try {
    const response = await api.post(`/auth/check-token`, payload)
    return response.data
  } catch(error) {
    throw error
  }
}