/**
 * Imports
 */

import Pager from './lib/Pager.js'
import { categoriesList } from './data/categoriesList.js' 
import pagerConfig from './configs/pager.js'
import { expensesStorage, createExpenseElement, renderExpensesList } 
    from './lib/expenses.js';
import { categoriesStorage, createCategoryElement, fillCategoriesContainer }
     from './lib/categories.js';
import { getSelectedCategory } from './data/state.js'

/**
 * Main
 */

/**
 * Nodes
 */

const $categoriesContainer = document.getElementById('categories');
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
        categoriesStorage.createExpense(getSelectedCategory(), $sum, $comment);

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
    fillCategoriesContainer($categoriesContainer);
    $submit.addEventListener('click', handleSubmit);
    renderExpensesList($dates);
});