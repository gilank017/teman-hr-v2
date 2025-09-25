import api from '@/plugins/axios'

export const getListBusinessTripPurpose = async (params) => {
  try {
    const response = await api.get(`/business-trip-types`, { params })
    return response.data
  } catch(error) {
    throw error
  }
}