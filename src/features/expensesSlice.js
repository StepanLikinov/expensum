import { createSlice } from '@reduxjs/toolkit';

const loadExpensesFromLocalStorage = () => {
    const stored = localStorage.getItem('expenses');
    return stored ? JSON.parse(stored) : [];
};

const saveExpensesToLocalStorage = (expenses) => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
};

const initialState = {
    list: loadExpensesFromLocalStorage(),
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses(state, action) {
            state.list = action.payload;
            saveExpensesToLocalStorage(state.list);
        },
        addExpense(state, action) {
            state.list.push(action.payload);
            saveExpensesToLocalStorage(state.list);
        },
    },
});

export const { setExpenses, addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;