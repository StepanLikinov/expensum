/**
 * Imports
 */

import './style.css';
import { categoriesList } from './data/categoriesList' 
import ExpensesDomApi from './lib/ExpensesDomApi';
import expensesStorage from './lib/expensesStorageApi'
import CategoriesDomApi from './lib/CategoriesDomApi';
import categoriesStorage from './lib/categoriesStorageApi';
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

const categoryElements: NodeListOf<HTMLElement> = 
    document.querySelectorAll('.category')

/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

const datesDomApi: DatesDomApi = new DatesDomApi($day, $calendar);

const nav: Nav = new Nav(
    $navLinks, $mainLink, $newExpenseLink, $expensesListLink, $expenseForm
);
// -----------------------------------------------------------------------------
function clickHandle() {
    resetForm($sum, $comment);
    pager.showPage('new');

    if (nav.$newExpenseLink instanceof HTMLAnchorElement) {
        nav.setActive(nav.$newExpenseLink)
    }
}
// -----------------------------------------------------------------------------
const categoriesDomApi: CategoriesDomApi = new CategoriesDomApi(
    $categoryTemplate, $categorySelect, clickHandle
);
const expensesDomApi: ExpensesDomApi = new ExpensesDomApi(
    $expenseTemplate, $expensesContainer, $day, $sum, $comment, $calendar
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
    if ($totalExpenses) {
        expensesDomApi.showTotal(
            expensesStorage.getCurrentMonth(), 
            $totalExpenses
        );
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
        });
    }
});