import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User, Address } from "@/lib/types"

interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
      state.loading = false
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload }
      }
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      if (state.currentUser) {
        state.currentUser.address = action.payload
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile, updateAddress } = userSlice.actions

export default userSlice.reducer

