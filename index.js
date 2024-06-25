/**
 * Imports
 */

import Pager from './lib/Pager.js'
import { categoriesList } from './data/categoriesList.js' 
import pagerConfig from './configs/pager.js'
import { expensesStorage, createExpenseElement, renderExpensesList } 
    from './lib/expenses.js';
import { categoriesStorage, setDefaultCategory, fillCategoriesContainer,fillCategoriesSelect }
     from './lib/categories.js';
import { getSelectedCategory, setSelectedCategory } from './data/state.js'

/**
 * Main
 */

/**
 * Nodes
 */

const $categoriesContainer = document.getElementById('categories');
const $categorySelect = document.getElementById('category-select');
const $selects = $categorySelect.querySelectorAll('select');
const $dates = document.getElementById('dates');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $submit = document.getElementById('submit');

/**
 * Functions
 */

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

//  Инициацилизация Pager
const pager = new Pager(pagerConfig, 'main', 'flex');

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    setDefaultCategory();
    fillCategoriesContainer($categoriesContainer);
    fillCategoriesSelect($categorySelect);
    $submit.addEventListener('click', handleSubmit);
    renderExpensesList($dates);
});