import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../store';

interface FilterState {
  timezone: string;
  availability: string;
  language: string[];
}

const initialState: FilterState = {
  timezone: '',
  availability: '',
  language: [''],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTimezone: (state: FilterState, action): FilterState => {
      return {
        ...state,
        timezone: action.payload,
      };
    },
    setAvailability: (state: FilterState, action): FilterState => {
      return {
        ...state,
        availability: action.payload,
      };
    },
    setLanguage: (state: FilterState, action): FilterState => {
      return {
        ...state,
        language: action.payload,
      };
    },
    resetFilter: (state: FilterState): FilterState => {
      return initialState;
    },
  },
});

export const {setTimezone, setLanguage, setAvailability, resetFilter} =
  filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
