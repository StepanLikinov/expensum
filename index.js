/**
 * Imports
 */

import { categoriesList } from './data/categoriesList.js' 
import expensesDomApi from './lib/expensesDomApi.js';
import expensesStorage from './lib/expensesStorageApi.js'
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
const $expenseForm = document.getElementById('expense-form');
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
    expensesDomApi.showTotal(expensesStorage.getCurrentMonth(), $totalExpenses);
    categoriesDomApi.setDefault();
    categoriesDomApi.fillContainer($categoriesContainer);
    datesDomApi.showCurrentMonth($currentMonth);
    categoriesDomApi.fillSelect($categorySelect);
    handleNewLinkClick();
    $expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        expensesDomApi.handleSubmit();
    });
    
    const expenses = expensesStorage.getAll();
    expensesDomApi.renderList(expenses);
});