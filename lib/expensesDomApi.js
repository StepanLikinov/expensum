/**
 * Imports
 */

import { clearContainer } from './heplers.js';
import datesDomApi from './datesDomApi.js';
import categoriesDomApi from './categoriesDomApi.js';
import expensesStorage from './expensesStorageApi.js';

/**
 * Nodes
 */

const $expenseTemplate = document.getElementById('expense-template');
const $day = document.getElementById('day');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $datesContainer = document.getElementById('dates-container');
const $totalExpenses = document.getElementById('total-expenses');
const $calendar = document.getElementById('calendar');

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

    // Рендеринг списка расходов выбраннго месяца
    renderSelectedMonthList: function() {
        const selectedMonth = 
            Number.parseInt($calendar.value.split('-')[1]) - 1;
        const selectedMonthExpenses = 
            expensesStorage.getByMonth(selectedMonth);
        this.renderList(selectedMonthExpenses);
    },

    // Отображение суммы расходов за месяц
    showTotal: function(expensesPeriod, $target) {
        const totalExpenses = expensesStorage.calculateTotal(expensesPeriod);
        $target.innerText = `Итого расходов: ${totalExpenses}`;
    },

    // Получение данных в форме
    getFormData: function () {
        const date = new Date($day.value).getTime();
        const selectedCategory = categoriesDomApi.getSelected();
        const sum = $sum.value;
        const comment = $comment.value;

        return {
            date,
            selectedCategory,
            sum,
            comment
        }
    }
}

/* Exports */

export default expensesDomApi;

