/**
 * Imports
 */

import { categoriesList } from './data/categoriesList.js' 
import expensesDomApi from './lib/expensesDomApi.js';
import expensesStorage from './lib/expensesStorageApi.js'
import categoriesDomApi from './lib/categoriesDomApi.js';
import categoriesStorage from './lib/categoriesStorageApi.js';
import datesDomApi from './lib/datesDomApi.js';
import pager from './lib/pagerInit.js';

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
const $nav = document.querySelector('nav');
const $newExpenseLink = $nav.querySelectorAll('li')[1];
/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    // Global
    $newExpenseLink.addEventListener('click', () => {
        categoriesDomApi.resetForm();
    });
    // Main
    expensesDomApi.showTotal(expensesStorage.getCurrentMonth(), $totalExpenses);
    categoriesDomApi.fillContainer($categoriesContainer);

    // Form
    categoriesDomApi.setDefaultInForm();
    categoriesDomApi.fillSelect($categorySelect);
    datesDomApi.showCurrentMonth($currentMonth);
    $expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = expensesDomApi.getFormData();
        const expense = expensesStorage.createExpense(
            formData.selectedCategory, formData.sum, formData.comment
        );
        expensesStorage.add(expense);
        const expenses = expensesStorage.getAll();
        expensesDomApi.renderList(expenses);
        pager.showPage('list');
        expensesDomApi.showTotal(
            expensesStorage.getCurrentMonth(), $totalExpenses
        );
    });
    
    // List
    datesDomApi.setCalendarValue();
    const expenses = expensesStorage.getAll();
    expensesDomApi.renderList(expenses);
});