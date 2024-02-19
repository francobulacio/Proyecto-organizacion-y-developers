import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

interface ErrorState {
    error: string | null,
    showModal: boolean
}

const initialState: ErrorState ={
    error: null,
    showModal: false
}

export const errorSlice = createSlice({
    name: 'error',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setError: (state: ErrorState, action): ErrorState => {
            return {
                ...state,
                error: action.payload,
                showModal: true
            }
        },
        removeError: (state: ErrorState ): ErrorState => {
            return initialState
        }
    }
})

export const { setError, removeError } = errorSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectError = (state: RootState) => state.error;

export default errorSlice.reducer;