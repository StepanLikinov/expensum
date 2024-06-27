/**
 * Imports
 */

import generateId from './generateId.js';

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
            sum: sum,
            comment: comment,
            date: Date.now() // Хранение даты в формате timestamp
        };
    }
};

/* Exports */

export default expensesStorage;

