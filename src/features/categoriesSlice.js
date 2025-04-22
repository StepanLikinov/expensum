import { createSlice } from '@reduxjs/toolkit';
import { categoriesList } from '../data/categoriesList';

const initialCategories = (() => {
    const stored = localStorage.getItem('expenseCategories');
    return stored ? JSON.parse(stored) : categoriesList;
})();

const saveToLocalStorage = (categories) => {
    localStorage.setItem('expenseCategories', JSON.stringify(categories));
};

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
            saveToLocalStorage(state.list);
        },
        selectCategory(state, action) {
            state.selectedCategory = action.payload;
        },
    },
});

export const { setCategories, selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;