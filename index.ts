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
    document.getElementById('categories-container');
const $categorySelect: HTMLElement | null = 
    document.getElementById('category-select');
const $currentMonth: HTMLElement | null = 
    document.getElementById('current-month');
const $expenseForm: HTMLElement | null = 
    document.getElementById('expense-form');
const $totalExpenses: HTMLElement | null = 
    document.getElementById('total-expenses');
const $newExpenseLink: HTMLElement | null = 
    document.getElementById('newExpenseLink'); 
const $expensesListLink: HTMLElement | null = 
    document.getElementById('expensesListLink');
const $calendar: HTMLElement | null = 
    document.getElementById('calendar');

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
    if ($newExpenseLink instanceof HTMLAnchorElement) {
        $newExpenseLink.addEventListener('click', () => {
            categoriesDomApi.setDefaultInForm();
            expensesDomApi.resetForm();
        });    
    }
    if ($expensesListLink instanceof HTMLAnchorElement) {
        $expensesListLink.addEventListener('click', () => {
            expensesDomApi.renderSelectedMonthList();
        });
    }

    // Main
    if ($totalExpenses) {
        expensesDomApi.showTotal(
            expensesStorage.getCurrentMonth(), 
            $totalExpenses);
    }
    if ($categoriesContainer){
        categoriesDomApi.fillContainer($categoriesContainer);
    }
    

    // Form
    datesDomApi.setDayValue();
    categoriesDomApi.setDefaultInForm();
    if ($categorySelect instanceof HTMLSelectElement){
        categoriesDomApi.fillSelect($categorySelect);
    }
    if ($currentMonth) {
        datesDomApi.showCurrentMonth($currentMonth);
    }
    if ($expenseForm instanceof HTMLFormElement){
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
                if ($totalExpenses) {
                    expensesDomApi.showTotal(
                        expensesStorage.getCurrentMonth(), $totalExpenses
                    );
                }
            }
        });
    }
    
    // List
    datesDomApi.setCalendarValue();
    if ($calendar instanceof HTMLInputElement) {
        $calendar.addEventListener('change', function() {
            expensesDomApi.renderSelectedMonthList();
        })
    }
});