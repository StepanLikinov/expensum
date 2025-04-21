import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/pageSlice';
import categoriesReducer from '../features/categoriesSlice'
import dateReducer from '../features/dateSlice';
import expensesReducer from '../features/expensesSlice'

export const store = configureStore({
    reducer: {
        page: pageReducer,
        categories: categoriesReducer,
        date: dateReducer,
        expenses: expensesReducer,
    },
});

export default store;