/**
 * Imports
 */

import { categoriesList } from './data/categoriesList.js' 
import expensesDomApi from './lib/expensesDomApi.js';
import categoriesDomApi from './lib/categoriesDomApi.js';
import categoriesStorage from './lib/categoriesStorageApi.js';
import datesDomApi from './lib/datesDomApi.js';
import { handleNewLinkClick } from './lib/nav.js'

/**
 * Main
 */

/* Nodes */

const $categoriesContainer = document.getElementById('categories-container');
const $categorySelect = document.getElementById('category-select');
const $currentMonth = document.getElementById('current-month');
const $submit = document.getElementById('submit');
const $datesContainer = document.getElementById('dates-container');
const $totalExpenses = document.getElementById('total-expenses');

/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    expensesDomApi.showTotal(expensesDomApi.getCurrentMonth(), $totalExpenses);
    categoriesDomApi.setDefault();
    categoriesDomApi.fillContainer($categoriesContainer);
    datesDomApi.showCurrentMonth($currentMonth);
    categoriesDomApi.fillSelect($categorySelect);
    handleNewLinkClick();
    $submit.addEventListener('click', expensesDomApi.handleSubmit);
    expensesDomApi.renderList($datesContainer);
});