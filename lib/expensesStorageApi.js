/**
 * Imports
 */

import generateId from './generateId.js';
import datesDomApi from './datesDomApi.js';

/**
 * Storage
 */

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

    createExpense: function (selectedCategory, sum, comment) {
        return {
            id: generateId(),
            category: selectedCategory,
            sum: Number.parseFloat(sum),
            comment: comment,
            date: Date.now() // Хранение даты в формате timestamp
        };
    },

    // Получение расходов по выбранному месяцу
    getByMonth: function(month) {
        const expenses = this.getAll();
        const selectedMonthExpenses = expenses.filter(function(expense) {
            const expenseDate = new Date(expense.date);
            const expenseMonth = expenseDate.getMonth();
            return expenseMonth === month;
        });
      
            return selectedMonthExpenses;
    },

    // Получение расходов текущего месяца
    getCurrentMonth: function() {
        const currentMonthExpenses = 
            this.getByMonth(datesDomApi.current.getMonth());

        return currentMonthExpenses;
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
};

/* Exports */

export default expensesStorage;

