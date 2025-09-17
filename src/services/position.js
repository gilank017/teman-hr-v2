import api from '@/plugins/axios'

export const getListPositions = async (params) => {
  try {
    const response = await api.get(`/positions`, { params })
    return response.data
  } catch(error) {
    throw error
  }
}

export const addPosition = async (payload) => {
  try {
    const response = await api.post(`/positions`, payload)
    return response.data
  } catch(error) {
    throw error
  }
}

export const updatePosition = async (positionId, payload) => {
  try {
    const response = await api.patch(`/positions/${positionId}`, payload)
    return response.data
  } catch(error) {
    throw error
  }
}

export const deletePosition = async (positionId) => {
  try {
    const response = await api.delete(`/positions/${positionId}`)
    return response.data
  } catch(error) {
    throw error
  }
}