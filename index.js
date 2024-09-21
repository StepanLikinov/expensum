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
import { setActive } from './lib/heplers.js';

/**
 * Main
 */

/* Nodes */

const $categoriesContainer = document.getElementById('categories-container');
const $categorySelect = document.getElementById('category-select');
const $currentMonth = document.getElementById('current-month');
const $expenseForm = document.getElementById('expense-form');
const $totalExpenses = document.getElementById('total-expenses');
const $mainLink = document.getElementById('mainLink')
const $newExpenseLink = document.getElementById('newExpenseLink');
const $expensesListLink = document.getElementById('expensesListLink');
const $calendar = document.getElementById('calendar');

/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    // Global
    $mainLink.addEventListener('click', () => {
        setActive($mainLink);
    });
    $newExpenseLink.addEventListener('click', () => {
        categoriesDomApi.resetForm();
        setActive($newExpenseLink);
    });
    $expensesListLink.addEventListener('click', () => {
        expensesDomApi.renderSelectedMonthList();
        setActive($expensesListLink);
    });

    // Main
    expensesDomApi.showTotal(expensesStorage.getCurrentMonth(), $totalExpenses);
    categoriesDomApi.fillContainer($categoriesContainer);
    setActive($mainLink);

    // Form
    datesDomApi.setDayValue();
    categoriesDomApi.setDefaultInForm();
    categoriesDomApi.fillSelect($categorySelect);
    datesDomApi.showCurrentMonth($currentMonth);
    $expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = expensesDomApi.getFormData();
        const expense = expensesStorage.create(
            formData.date, formData.selectedCategory, 
            formData.sum, formData.comment
        );
        expensesStorage.add(expense);
        datesDomApi.setCalendarValue();
        expensesDomApi.renderSelectedMonthList();
        pager.showPage('list');
        setActive($expensesListLink);
        expensesDomApi.showTotal(
            expensesStorage.getCurrentMonth(), $totalExpenses
        );
    });
    
    // List
    datesDomApi.setCalendarValue();
    $calendar.addEventListener('change', function() {
        expensesDomApi.renderSelectedMonthList();
    })
});