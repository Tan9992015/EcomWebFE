import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    accessToken: '',
    isAdmin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {email= '', name = '', accessToken= '', phone ='', avatar='', address='', _id = '', isAdmin} = action.payload
      console.log('action', action)
      state.name = name || email
      state.email = email
      state.accessToken = accessToken
      state.address = address
      state.phone = phone
      state.id = _id
      state.avatar = avatar
      state.isAdmin = isAdmin
    },
    resetUser:(state) => {
      state.name = ''
      state.email = ''
      state.accessToken = ''
      state.phone = ''
      state.avatar = ''
      state.address = ''
      state.id = ''
      state.isAdmin = false
    }
  }
})

export const { updateUser, resetUser } = userSlice.actions
export default userSlice.reducer
