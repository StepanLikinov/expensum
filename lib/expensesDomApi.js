/**
 * Imports
 */

import { clearContainer } from './heplers.js';
import datesDomApi from './datesDomApi.js';
import categoriesDomApi from './categoriesDomApi.js';
import expensesStorage from './expensesStorageApi.js';
import pager from './pagerInit.js';

/**
 * Nodes
 */

const $expenseTemplate = document.getElementById('expense-template');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $datesContainer = document.getElementById('dates-container');
const $totalExpenses = document.getElementById('total-expenses');

/**
 * DOM API
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
    renderList: function(data) {
        clearContainer($datesContainer);

        data.forEach(expense => {
            const $date = datesDomApi.create(expense.date);
            const $expense = this.create(expense);
            $date.appendChild($expense);
            $datesContainer.appendChild($date);
        });
    },

    // Получение расходов текущего месяца
    getCurrentMonth: function(){
        const expenses = expensesStorage.getAll();
        const currentMonth = datesDomApi.current.getMonth();
        const currentMothsExpenses = expenses.filter(function(expense) {
            const expenseDate = new Date(expense.date);
            const expenseMonth = expenseDate.getMonth();
           
            return expenseMonth === currentMonth;
        });

        return currentMothsExpenses;
    },

    // Расчет суммы расходов за период
    calculateTotal: function(expensesPeriod) {
        const totalExpensesSum = expensesPeriod.reduce(
            function(total, expense) {
                return total + expense.sum;
            }, 
        0);

        return totalExpensesSum;
    },

    // Отображение суммы расходов за месяц
    showTotal: function(expensesPeriod, $target) {
        const totalExpenses = this.calculateTotal(expensesPeriod);
        $target.innerText = `Итого расходов: ${totalExpenses}`;
    },

    // Обработка отправки формы
    handleSubmit: function() {
        const selectedCategory = categoriesDomApi.getSelected();
        const sum = $sum.value;
        const comment = $comment.value;
        const expense = 
            expensesStorage.createExpense(selectedCategory, sum, comment);
        expensesStorage.add(expense);
        const expenses = expensesStorage.getAll();
        expensesDomApi.renderList(expenses);
        pager.showPage('list');
        expensesDomApi.showTotal(
            expensesDomApi.getCurrentMonth(), 
            $totalExpenses
        );
    }
}

/* Exports */

export default expensesDomApi;

