import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

// Define a type for the slice state
interface RegisterState {
  name: string,
  surname: string,
  email: string,
  password: string,
  role: string,
  avatar: string,
  social: {
    linkedin: string,
    portfolio: string,
    github: string,
  },
  info: {
    time_availability: string,
    time_zone: string,
    experience: number,
    language: string[],
  }
}

// Define the initial state using that type
const initialState: RegisterState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  role: "",
  avatar: "",
  social: {
    linkedin: "",
    portfolio: "",
    github: ""
  },
  info: {
    time_availability: "",
    time_zone: "",
    experience: 0,
    language: []
  }
}

export const registerSlice = createSlice({
  name: 'register',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    register: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }
})

export const { register } = registerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;