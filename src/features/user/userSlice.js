import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false
}

const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (user && isAuthenticated === 'true') {
      return {
        user: JSON.parse(user),
        isAuthenticated: true
      }
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error)
  }
  return initialState
}

const userSlice = createSlice({
  name: 'user',
  initialState: loadUserFromStorage(),
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true

      localStorage.setItem('user', JSON.stringify(action.payload))
      localStorage.setItem('isAuthenticated', 'true')

      const existingUsers = JSON.parse(localStorage.getItem('users')) || []
      const userExists = existingUsers.some(u => u.phone === action.payload.phone)

      if (!userExists) {
        existingUsers.push(action.payload)
        localStorage.setItem('users', JSON.stringify(existingUsers))
      }
    },

    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.setItem('isAuthenticated', 'false')
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
      const users = JSON.parse(localStorage.getItem('users')) || []
      const updatedUsers = users.map(u =>
        u.phone === state.user.phone ? state.user : u
      )
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    }
  }
})

export const { setUser, clearUser, updateUser } = userSlice.actions
export default userSlice.reducer
