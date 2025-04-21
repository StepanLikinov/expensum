import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentDate: new Date().toISOString().slice(0, 10),
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.currentDate = action.payload;
        },
    },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;