import api from '@/plugins/axios'

export const getListSchedules = async (params) => {
  try {
    const response = await api.get(`/schedule-groups`, { params })
    return response.data
  } catch(error) {
    throw error
  }
}