import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  success: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.success = null
    },
    setSuccess: (state, action) => {
      state.success = action.payload
      state.error = null
    },
    clearAuthState: (state) => {
      state.loading = false
      state.error = null
      state.success = null
    }
  }
})

export const { setLoading, setError, setSuccess, clearAuthState } = authSlice.actions
export default authSlice.reducer