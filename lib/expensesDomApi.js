/**
 * Imports
 */

import { clearContainer } from './heplers.js';
import { createDateElement } from './dates.js';
import { getSelectedCategory } from '../data/state.js'
import expensesStorage from './expensesStorageApi.js';
import pager from './pagerInit.js';

/**
 * Nodes
 */

const $expenseTemplate = document.getElementById('expenseTemplate');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $dates = document.getElementById('dates');

/**
 * Functions
 */

// Cоздание элемента расхода
const createExpenseElement = (expense) => {
    const $expenseDiv = 
        $expenseTemplate.content.cloneNode(true).querySelector('.expense');
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
        expensesStorage.createExpense(getSelectedCategory(), $sum, $comment);
    expensesStorage.add(expense);
    renderExpensesList($dates);
    pager.showPage('list');
};


/* Exports */

export { renderExpensesList, handleSubmit };

