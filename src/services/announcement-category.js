import api from '@/plugins/axios'

export const getListAnnouncementCategory = async (params) => {
  try {
    const response = await api.get(`/announcement-category`, { params })
    return response.data
  } catch(error) {
    throw error
  }
}