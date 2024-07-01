/**
 * Imports
 */

import pager from './lib/pagerInit.js';
import { categoriesList } from './data/categoriesList.js' 
import expensesStorage from './lib/expensesStorageApi.js';
import { renderExpensesList, handleSubmit } from './lib/expensesDomApi.js';
import categoriesDomApi from './lib/categoriesDomApi.js';
import categoriesStorage from './lib/categoriesStorageApi.js';
import { getSelectedCategory } from './data/state.js'
import { handleNewLinkClick } from './lib/nav.js'

/**
 * Main
 */

/* Nodes */

const $categoriesContainer = document.getElementById('categories-container');
const $categorySelect = document.getElementById('category-select');
const $submit = document.getElementById('submit');
const $datesContainer = document.getElementById('dates-container');

/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    categoriesDomApi.setDefault();
    categoriesDomApi.fillContainer($categoriesContainer);
    categoriesDomApi.fillSelect($categorySelect);
    handleNewLinkClick();
    $submit.addEventListener('click', handleSubmit);
    renderExpensesList($datesContainer);
});