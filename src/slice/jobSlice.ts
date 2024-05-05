import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedOptionsState {
    roles: string[];
    minExp: number;
    minJdSalary: number;
    location: string;
}

const initialState: SelectedOptionsState = {
    roles: [],
    minExp: 0,
    minJdSalary: 0,
    location: ""
};

const selectedOptionsSlice = createSlice({
    name: 'selectedOptions',
    initialState,
    reducers: {
        setRoles: (state, action: PayloadAction<string[]>) => {
            state.roles = [...state.roles, ...action.payload]
        },
        setExperience: (state, action: PayloadAction<number>) => {
            state.minExp = action.payload;
        },
        setMinimumBasePaySalary: (state, action: PayloadAction<number>) => {
            state.minJdSalary = action.payload;
        },
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
        clearAllFilters: (state) => {
            state.roles = [],
            state.minExp = 0,
            state.minJdSalary = 0
        }
    }
});

export const { setRoles, setExperience, setMinimumBasePaySalary, setLocation, clearAllFilters } = selectedOptionsSlice.actions;
export default selectedOptionsSlice.reducer;
