import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedOptionsState {
    roles: string[];
    minExp: number;
    minJdSalary: number;
    location: string;
    searchQuery: string;
}

const initialState: SelectedOptionsState = {
    roles: [],
    minExp: 0,
    minJdSalary: 0,
    location: "",
    searchQuery: "",
};

const selectedOptionsSlice = createSlice({
    name: 'selectedOptions',
    initialState,
    reducers: {
        setRoles: (state, action: PayloadAction<string[]>) => {
            const newRoles = action.payload.filter(role => !state.roles.includes(role));
            state.roles.push(...newRoles);
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
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        clearAllFilters: (state) => {
            state.roles = [],
            state.minExp = 0,
            state.minJdSalary = 0
        }
    }
});

export const { setRoles, setExperience, setMinimumBasePaySalary, setLocation, setSearchQuery, clearAllFilters } = selectedOptionsSlice.actions;
export default selectedOptionsSlice.reducer;
