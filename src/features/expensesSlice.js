import { createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../lib/helpers';

const initialState = {
    list: loadFromLocalStorage('expenses', [])
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses(state, action) {
            state.list = action.payload;
            saveToLocalStorage('expenses', state.list);
        },
        addExpense(state, action) {
            state.list.push(action.payload);
            saveToLocalStorage('expenses', state.list);
        },
    },
});

export const { setExpenses, addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;