/* Imports */

import generateId from './generateId.js';
import { clearContainer } from './heplers.js';
import { createDateElement } from './dates.js';

/* Nodes */

const $expenseTemplate = document.getElementById('expenseTemplate');

/* Functions */

const expensesStorage = {
    getAll: function() {
        return JSON.parse(localStorage.getItem('expenses')) || []
    },
    saveAll: function(expenses) {
        return localStorage.setItem('expenses', JSON.stringify(expenses))
    },
    add: function(expense) {
        const expenses = this.getAll();
        expenses.push(expense);
        this.saveAll(expenses);
    },
    createExpense: function (selectedCategory, $sum, $comment) {
        return {
            id: generateId(),
            category: selectedCategory,
            sum: $sum.value,
            comment: $comment.value,
            date: Date.now() // Хранение даты в формате timestamp
        };
    }
};

const createExpenseElement = (expense) => {
    const $expenseDiv = $expenseTemplate.content.cloneNode(true).querySelector('.expense');
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

export { expensesStorage, createExpenseElement, renderExpensesList};

