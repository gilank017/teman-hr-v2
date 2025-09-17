import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import api from '@/plugins/axios'
import { decodeText, checkEncryptText } from '@/plugins/encrypt'
import { verifyToken } from '@/services/auth'

const cookies = new Cookies()

export const sessionUser = createAsyncThunk('authLogin/sessionUser', async () => {
  const token = cookies.get('token_account_tandeem')
  let credential = null
  if (token) {
    credential = token
  } else {
    credential = null
  }
  return credential
})

const authLogin = createSlice({
  name: 'auth',
  initialState: {
    loadingAuth: true,
    isLogin: false,
    authorization: null,
    dataUser: null,
  },
  reducers: {
    updateAuth: (state, action) => {
      state.isLogin = action.payload.isLogin
      state.authorization = action.payload.authorization
      state.dataUser = action.payload.dataUser
      state.loadingAuth = action.payload.loadingAuth
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sessionUser.pending, (state) => {
        state.loadingAuth = true
      })
      .addCase(sessionUser.fulfilled, (state, action) => {
        if (action.payload !== null) {
          const dataState = action.payload
          let data = null
          const checkToken = checkEncryptText(dataState)
          if (checkToken) {
            const decodedToken = decodeText(dataState)
            data = JSON.parse(decodedToken)
          } else {
            data = dataState
          }
          api.defaults.headers.common['Authorization'] = `Bearer ${typeof data === 'object' ? data.access_token : data}`
          state.authorization = typeof data === 'object' ? data.access_token : data
          state.dataUser = handleDataUser(data)
          state.isLogin = handleStateLogin(data)
          state.loadingAuth = false
        } else {
          cookies.remove('token_account_tandeem')
          state.authorization = null
          state.dataUser = null
          state.isLogin = false
          state.loadingAuth = false
        }
    })
    .addCase(sessionUser.rejected, (state) => {
      cookies.remove('token_account_tandeem')
      state.authorization = null
      state.dataUser = null
      state.isLogin = false
      state.loadingAuth = false
    })
  }
})

const handleDataUser = (data) => {
  let dataUser = null
  if (typeof data === 'object') {
    dataUser = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      organizationId: data.organizationId,
      organization: data.organization,
      role: data.role[0].name,
      roleAlias: data.roleAlias[0],
      username: data.username
    }
  } else {
    const dataCookie = cookies.get('authData')
    if (dataCookie) {
      dataUser = {
        id: dataCookie.id,
        fullName: dataCookie.fullName,
        email: dataCookie.email,
        organizationId: dataCookie.organizationId,
        organization: data.organization,
        role: dataCookie.role.name,
        roleAlias: dataCookie.roleAlias,
        username: null
      }
    }
  }
  return dataUser
}

const handleStateLogin = (data) => {
  let loginState = false
  if (typeof data === 'object') {
    loginState = true
  } else {
    const dataCookie = cookies.get('authData')
    if (dataCookie !== undefined) {
      loginState = true
    } else {
      cookies.remove('token_account_tandeem')
    }
  }
  return loginState
}

export const { updateAuth } = authLogin.actions
export default authLogin.reducer