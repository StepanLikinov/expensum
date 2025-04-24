import { createSlice } from '@reduxjs/toolkit';
import { categoriesList } from '../data/categoriesList';
import { loadFromLocalStorage, saveToLocalStorage } from '../lib/helpers';

const initialCategories = 
    loadFromLocalStorage('expenseCategories', categoriesList);

const initialState = {
    list: initialCategories,
    selectedCategory: initialCategories[0].name,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action) {
            state.list = action.payload;
            saveToLocalStorage('expenseCategories', state.list);
        },
        selectCategory(state, action) {
            state.selectedCategory = action.payload;
        },
    },
});

export const { setCategories, selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;