import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthUser, IUser } from '../../components/types/userType'

const initialState: IAuthUser = {
  firstName: null,
  email: null,
  id: null,
  theme: { label: null, value: null },
  message: null,
  auth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addInfo(state, action: PayloadAction<IAuthUser>) {
      state.firstName = action.payload.firstName
      state.email = action.payload.email
      state.id = action.payload.id
      state.theme = action.payload.theme
      state.message = action.payload.message
      state.auth = action.payload.auth
    },
    editInfo(state, action: PayloadAction<IUser>) {
      state.firstName = action.payload.firstName || state.firstName
      state.email = action.payload.email || state.email
      state.theme = action.payload.theme
      state.message = action.payload.message
    },
  },
})

export const { addInfo, editInfo } = userSlice.actions

export default userSlice.reducer
