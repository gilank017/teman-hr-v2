import api from '@/plugins/axios'

export const getListExpendType = async (params) => {
  try {
    const response = await api.get(`/expend-type`, { params })
    return response.data
  } catch(error) {
    throw error
  }
}