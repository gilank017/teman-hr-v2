import { createSlice } from "@reduxjs/toolkit"

const hookRoute = createSlice({
  name: 'route',
  initialState: {
    data: [],
  },
  reducers: {
    updateRoute: ( state, action ) => {
      state.data = action.payload.data
    }
  }
})

export const { updateRoute } = hookRoute.actions
export default hookRoute.reducer