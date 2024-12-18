/**
 * Imports
 */

import './style.css';
import { categoriesList } from './data/categoriesList' 
import ExpensesDomApi from './lib/ExpensesDomApi';
import expensesStorage from './lib/expensesStorageApi'
import CategoriesDomApi from './lib/CategoriesDomApi';
import categoriesStorage from './lib/categoriesStorageApi';
import DateState from './lib/DateState';
import DatesDomApi from './lib/DatesDomApi'
import pager from './lib/pagerInit';
import Nav from './lib/Nav'
import { FormData, Expense } from './lib/interfaces';
import { resetForm } from './lib/heplers';

/**
 * Main
 */

/* Nodes */

const $categoriesContainer: HTMLElement | null = 
    document.getElementById('categories-container');

const $categorySelect: HTMLElement | null = 
    document.getElementById('category-select');

const $categoryTemplate: HTMLElement | null =
    document.getElementById('category-template');

const $currentMonth: HTMLElement | null = 
    document.getElementById('current-month');

const $expenseTemplate: HTMLElement | null = 
    document.getElementById('expense-template');

const $expensesContainer: HTMLElement | null = 
    document.getElementById('expenses-container');

const $expenseForm: HTMLElement | null = 
    document.getElementById('expense-form');

const $totalExpenses: HTMLElement | null = 
    document.getElementById('total-expenses');

const $navLinks: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll('.navbar-nav a');

const $mainLink: HTMLElement | null = 
    document.getElementById('mainLink');

const $newExpenseLink: HTMLElement | null = 
    document.getElementById('newExpenseLink'); 

const $expensesListLink: HTMLElement | null = 
    document.getElementById('expensesListLink');

const $day: HTMLElement | null = 
    document.getElementById('day');
    
const $calendar: HTMLElement | null = 
    document.getElementById('calendar');

const $sum: HTMLElement | null = 
    document.getElementById('sum');

const $comment: HTMLElement | null = 
    document.getElementById('comment');

/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

const datesDomApi: DatesDomApi = new DatesDomApi(
    new DateState,
    $day, 
    $calendar, 
    $currentMonth
);

const nav: Nav = new Nav(
    $navLinks, 
    $mainLink, 
    $newExpenseLink, 
    $expensesListLink, 
    $expenseForm
);

const categoriesDomApi: CategoriesDomApi = new CategoriesDomApi(
    $categoryTemplate, 
    $categorySelect,
    $categoriesContainer, 
    () => {
        resetForm($sum, $comment);
        pager.showPage('new');

        if (nav.$newExpenseLink instanceof HTMLAnchorElement) {
            nav.setActive(nav.$newExpenseLink)
        }
    }
);

const expensesDomApi: ExpensesDomApi = new ExpensesDomApi(
    $expenseTemplate, 
    $expensesContainer, 
    $day, 
    $sum, 
    $comment, 
    $calendar,
    $totalExpenses
);

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    // Global
    nav.initIndication();

    if ($newExpenseLink instanceof HTMLAnchorElement) {
        $newExpenseLink.addEventListener('click', () => {
            categoriesDomApi.setDefaultInForm();
            resetForm($sum, $comment);
        });    
    }

    if ($expensesListLink instanceof HTMLAnchorElement) {
        $expensesListLink.addEventListener('click', () => {
            expensesDomApi.renderSelectedMonthList();
        });
    }

    // Main
    expensesDomApi.showTotal(expensesStorage.getCurrentMonth());
    categoriesDomApi.fillContainer();
    
    // Form
    datesDomApi.setDayValue();
    categoriesDomApi.setDefaultInForm();
    categoriesDomApi.fillSelect();
    datesDomApi.showCurrentMonth();

    if ($expenseForm instanceof HTMLFormElement){
        $expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData: FormData = expensesDomApi.getFormData();
            if (formData.selectedCategory) {
                const expense: Expense = expensesStorage.create(
                    formData.date, formData.selectedCategory, 
                    formData.sum, formData.comment
                );
                expensesStorage.add(expense);
                datesDomApi.setCalendarValue();
                expensesDomApi.renderSelectedMonthList();
                pager.showPage('list');
                expensesDomApi.showTotal(expensesStorage.getCurrentMonth());
            }
        });
    }
    
    // List
    datesDomApi.setCalendarValue();
    expensesDomApi.calendarChangeHandle();
});