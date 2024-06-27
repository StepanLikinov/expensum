/**
 * Imports
 */

import { clearContainer } from './heplers.js';
import { createDateElement } from './dates.js';
import expensesStorage from './expensesStorageApi.js';

/**
 * Nodes
 */

const $expenseTemplate = document.getElementById('expenseTemplate');

/**
 * Functions
 */

// создание элемента расхода
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

/* Exports */

export { renderExpensesList };

