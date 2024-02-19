import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

interface LoadingState {
    isLoading: boolean,
}

const initialState: LoadingState = {
    isLoading: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        loading: (state: LoadingState): LoadingState => {
            return {
                ...state,
                isLoading: true
            }
        },
        removeLoading: (state: LoadingState): LoadingState => {
            return {
                ...state,
                isLoading: false
            }
        }
    }
})

export const { loading, removeLoading } = loadingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = (state: RootState) => state.loading;

export default loadingSlice.reducer;