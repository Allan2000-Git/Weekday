import { configureStore } from '@reduxjs/toolkit';
import selectedOptionsReducer from '../slice/jobSlice';

export const store = configureStore({
    reducer: {
        selectedOptions: selectedOptionsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
