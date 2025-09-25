import api from '@/plugins/axios'

export const getListBusinessTripCost = async (params) => {
  try {
    const response = await api.get(`/business-trip-cost`, { params })
    return response.data
  } catch(error) {
    throw error
  }
}