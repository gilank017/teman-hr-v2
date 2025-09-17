import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthPermission } from '@/services/permission'

export const getPermission = createAsyncThunk('permission/getPermission', async () => {
  const response = await getAuthPermission()
  return response
})

const authPermission = createSlice({
  name: 'permission',
  initialState: {
    isLoadingPermission: true,
    access: null
  },
  reducers: {
    updatedPermission: (state, action) => {
      state.isLoadingPermission = action.payload.isLoadingPermission
      state.access = action.payload.access
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermission.pending, (state) => {
        state.isLoadingPermission = true
      })
      .addCase(getPermission.fulfilled, (state, action) => {
        state.access = action.payload
        state.isLoadingPermission = false
      })
      .addCase(getPermission.rejected, (state) => {
        state.isLoadingPermission = false
        state.access = null
      })
  }
})

export const { updatePermission } = authPermission.actions
export default authPermission.reducer