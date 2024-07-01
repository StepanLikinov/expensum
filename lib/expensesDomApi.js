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

const $expenseTemplate = document.getElementById('expense-template');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $datesContainer = document.getElementById('dates-container');

/**
 * Functions
 */

const expensesDomApi = {
    // Cоздание элемента расхода
    create: function(expense) {
        const $expense = 
        $expenseTemplate.content.cloneNode(true).querySelector('.expense');
        $expense.innerText = 
        `Категория: ${expense.category}, Сумма: ${expense.sum}, `
        + `Комментарий: ${expense.comment}`;

        return $expense;
    },
    // Рендеринг списка расходов
    renderList: function($list) {
        clearContainer($list);
        const expenses = expensesStorage.getAll();
    
        expenses.forEach(expense => {
            const $date = createDateElement(expense.date);
            const $expense = this.create(expense);
            $date.appendChild($expense);
            $list.appendChild($date);
        });
    },
    // Обработка отправки формы
    handleSubmit: function() {
        const selectedCategory = getSelectedCategory();
        const sum = $sum.value;
        const comment = $comment.value;
        const expense = 
            expensesStorage.createExpense(selectedCategory, sum, comment);
        expensesStorage.add(expense);
        expensesDomApi.renderList($datesContainer);
        pager.showPage('list');
    }
}

/* Exports */

export default expensesDomApi;

