/**
 * Imports
 */

import './style.css';
import { categoriesList } from './data/categoriesList.js' 
import expensesDomApi from './lib/expensesDomApi.js';
import expensesStorage from './lib/expensesStorageApi.js'
import categoriesDomApi from './lib/categoriesDomApi.js';
import categoriesStorage from './lib/categoriesStorageApi.js';
import datesDomApi from './lib/datesDomApi.js';
import pager from './lib/pagerInit.js';
import navDomApi from './lib/navDomApi.js';

/**
 * Main
 */

/* Nodes */

const $categoriesContainer: HTMLElement | null = 
    document.getElementById('categories-container') as HTMLElement;
const $categorySelect: HTMLSelectElement | null = 
    document.getElementById('category-select') as HTMLSelectElement;
const $currentMonth: HTMLElement | null = 
    document.getElementById('current-month') as HTMLElement;
const $expenseForm: HTMLFormElement | null = 
    document.getElementById('expense-form') as HTMLFormElement;
const $totalExpenses: HTMLElement | null = 
    document.getElementById('total-expenses') as HTMLElement;
const $newExpenseLink: HTMLAnchorElement | null = 
    document.getElementById('newExpenseLink') as HTMLAnchorElement;
const $expensesListLink: HTMLAnchorElement | null = 
    document.getElementById('expensesListLink') as HTMLAnchorElement;
const $calendar: HTMLInputElement | null = 
    document.getElementById('calendar') as HTMLInputElement;

/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    // Global
    navDomApi.initIndication();
    $newExpenseLink.addEventListener('click', () => {
        categoriesDomApi.setDefaultInForm();
        expensesDomApi.resetForm();
    });
    $expensesListLink.addEventListener('click', () => {
        expensesDomApi.renderSelectedMonthList();
    });

    // Main
    expensesDomApi.showTotal(expensesStorage.getCurrentMonth(), $totalExpenses);
    categoriesDomApi.fillContainer($categoriesContainer);
    

    // Form
    datesDomApi.setDayValue();
    categoriesDomApi.setDefaultInForm();
    categoriesDomApi.fillSelect($categorySelect);
    datesDomApi.showCurrentMonth($currentMonth);
    $expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = expensesDomApi.getFormData();
        if (formData.selectedCategory) {
            const expense = expensesStorage.create(
                formData.date, formData.selectedCategory, 
                formData.sum, formData.comment
            );
            expensesStorage.add(expense);
            datesDomApi.setCalendarValue();
            expensesDomApi.renderSelectedMonthList();
            pager.showPage('list');
            expensesDomApi.showTotal(
                expensesStorage.getCurrentMonth(), $totalExpenses
            );
        }
    });
    
    // List
    datesDomApi.setCalendarValue();
    $calendar.addEventListener('change', function() {
        expensesDomApi.renderSelectedMonthList();
    })
});