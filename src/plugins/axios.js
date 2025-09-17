import axios from 'axios'
import Cookies from 'universal-cookie'
import { decodeText, checkEncryptText } from './encrypt'
import Router from 'next/router'

const cookies = new Cookies()

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, // Replace with your API base URL
})

api.interceptors.request.use((config) => {
  const token = cookies.get('token_account_tandeem') // Adjust the cookie name as needed
  if (token) {
    let accessToken = ''
    const checkToken = checkEncryptText(token)
    if (checkToken) {
      const decodedToken = decodeText(token)
      const parseDecodedToken = JSON.parse(decodedToken)
      accessToken = parseDecodedToken.access_token
    } else {
      accessToken = token
    }
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  return response
}, (error) => {
  const errorMessage = error.response?.data?.error
  if (errorMessage === 'Unauthorized') {
    // Handle unauthorized access, e.g., redirect to login
    console.warn('Unauthorized, redirecting to login...')
    cookies.remove('token_account_tandeem')
    cookies.remove('authData')
    Router.push('/login') // Uncomment and adjust as needed
  }
  return Promise.reject(error)
})


export default api