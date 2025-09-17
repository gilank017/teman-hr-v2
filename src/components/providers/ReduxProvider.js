'use client'
import { Provider } from 'react-redux'
import initializeStore from '@/lib/store'

export const ReduxProvider = ({ children }) => {
  return (
    <Provider store={initializeStore}>
      {children}
    </Provider>
  )
}