import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

interface AuthState {
    token: null | string,
}

const initialState: AuthState ={
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state: AuthState, action): AuthState => {
            return {
                ...state,
                token: action.payload
            }
        },
        logout:(state: AuthState ): AuthState => {
            return initialState
        }
    }
})

export const { setToken, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;