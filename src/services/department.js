import api from '@/plugins/axios'

export const getListDepartments = async (params) => {
  try {
    const response = await api.get(`/departments`, { params })
    return response.data
  } catch(error) {
    throw error
  }
}