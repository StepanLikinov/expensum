/**
 * Imports
 */

import { clearContainer } from './heplers.js';
import datesDomApi from './datesDomApi.js';
import categoriesDomApi from './categoriesDomApi.js';
import categoriesStorage from './categoriesStorageApi.js';
import expensesStorage from './expensesStorageApi.js';

/**
 * Nodes
 */

const $expenseTemplate = document.getElementById('expense-template');
const $day = document.getElementById('day');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $expensesContainer = document.getElementById('expenses-container');
const $totalExpenses = document.getElementById('total-expenses');
const $calendar = document.getElementById('calendar');

/**
 * DOM API
 */

const expensesDomApi = {
    // Cоздание элемента расхода
    create: function(expense) {
        const categoriesList = categoriesStorage.getAll();
        const category = 
            categoriesList.find(category => category.name === expense.category);
        const iconClass = category.iconClass;

        const $expense = 
            $expenseTemplate.content.cloneNode(true).querySelector('.expense');
        $expense.querySelector('.expense-date').innerText = 
            datesDomApi.create(expense.date);
        $expense.querySelector('.expense-category').innerText = 
            expense.category;
        $expense.querySelector('.expense-category-icon').querySelector('i')
            .className = iconClass;
        $expense.querySelector('.expense-amount').innerText = 
            `${expense.sum} ₽`;
        $expense.querySelector('.expense-comment').innerText = 
            `Комментарий: ${expense.comment}`;

        return $expense;
    },

    // Рендеринг списка расходов
    renderList: function(data) {
        clearContainer($expensesContainer);

        data.forEach(expense => {
            const $expense = this.create(expense);
            $expensesContainer.appendChild($expense);
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
        $target.innerText = `${totalExpenses} ₽`;
    },

    // Получение данных из формы
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

