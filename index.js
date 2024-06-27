/**
 * Imports
 */

import pager from './lib/pagerInit.js';
import { categoriesList } from './data/categoriesList.js' 
import { expensesStorage, renderExpensesList } from './lib/expensesDomApi.js';
import { 
    categoriesStorage, 
    setDefaultCategory, 
    fillCategoriesContainer,
    fillCategoriesSelect 
} from './lib/categoriesDomApi.js';
import { getSelectedCategory } from './data/state.js'
import { handleNewLinkClick } from './lib/nav.js'

/**
 * Main
 */

/* Nodes */

const $categoriesContainer = document.getElementById('categories');
const $categorySelect = document.getElementById('category-select');
const $selects = $categorySelect.querySelectorAll('select');
const $dates = document.getElementById('dates');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $submit = document.getElementById('submit');

/* Functions */

// Обработка отправки формы
const handleSubmit = () => {
    const expense = 
        expensesStorage.createExpense(getSelectedCategory(), $sum, $comment);
    expensesStorage.add(expense);
    renderExpensesList($dates);
    pager.showPage('list');
};

/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    setDefaultCategory();
    fillCategoriesContainer($categoriesContainer);
    fillCategoriesSelect($categorySelect);
    handleNewLinkClick();
    $submit.addEventListener('click', handleSubmit);
    renderExpensesList($dates);
});