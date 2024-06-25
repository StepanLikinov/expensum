/**
 * Imports
 */

import Pager from './lib/Pager.js'
import { categoriesList } from './data/categoriesList.js' 
import pagerConfig from './configs/pager.js'
import expensesStorage from './lib/expensesStorage.js';
import { categoriesStorage, createCategoryElement, fillCategoriesContainer } from './lib/categories.js';
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

// Очистка контейнера

const clearContainer = ($сontainer) => {
    $сontainer.innerHTML = '';
};

// Создание элемента даты
const createDateElement = (timestamp) => {
    const $dateDiv = document.createElement('div');
    $dateDiv.className = 'date';
    // преобразование даты в читабельный формат
    const dateObject = new Date(timestamp);
    $dateDiv.innerText = dateObject.toLocaleString(); 

    return $dateDiv;
};

// Создание элемента расхода
const createExpenseElement = (expense) => {
    const $expenseDiv = document.createElement('div');
    $expenseDiv.className = 'expense';
    $expenseDiv.innerText = 
        `Категория: ${expense.category}, Сумма: ${expense.sum}, `
        + `Комментарий: ${expense.comment}`;

    return $expenseDiv;
};

// Рендеринг списка расходов
const renderExpensesList = ($list) => {
    clearContainer($list);
    const expenses = expensesStorage.getAll();

    expenses.forEach(expense => {
        const $dateDiv = createDateElement(expense.date);
        const $expenseDiv = createExpenseElement(expense);
        $dateDiv.appendChild($expenseDiv);
        $list.appendChild($dateDiv);
    });
};

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