/**
 * Imports
 */

import generateId from './generateId.js';
import datesDomApi from './datesDomApi.js';
import categoriesStorage from './categoriesStorageApi.js';

/**
 * Storage
 */

const expensesStorage = {
    getAll: function() {
        let result;
        const expensesJson = localStorage.getItem('expenses');
        const expenses = JSON.parse(expensesJson);

        if (expenses === null) {
            result = [];
        } else {
            result = expenses;
        }
        return result;
    },

    saveAll: function(expenses) {
        const serializedExpenses = JSON.stringify(expenses);
        localStorage.setItem('expenses', serializedExpenses);
    },

    add: function(expense) {
        const expenses = this.getAll();
        expenses.push(expense);
        this.saveAll(expenses);
    },

    create: function (date, selectedCategory, sum, comment) {
        const category = categoriesStorage.find(selectedCategory);
        const categoryId = category.id;

        return {
            id: generateId(),
            date: date,
            category: selectedCategory,
            categoryId: categoryId,
            sum: Number.parseFloat(sum),
            comment: comment
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

