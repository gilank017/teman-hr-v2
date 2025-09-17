// lib/store.js
import { configureStore } from '@reduxjs/toolkit'
import authLogin from '@/lib/features/authLogin'
import authPermission from '@/lib/features/authPermission'
import hookRoute from '@/lib/features/hookRoute'

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authLogin,
      permission: authPermission,
      route: hookRoute
      // Add other reducers here
    },
  })
}

const initializeStore = createStore() // Create an instance of the store

export default initializeStore // Export the store instance for use in the app