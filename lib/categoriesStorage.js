/* Imports */

import generateId from './generateId.js';

/* Main */

const categoriesStorage = {
    getAll: function() { 
        return JSON.parse(localStorage.getItem('expenseCategories')) || [];
    },
    saveAll: function(categories) {
        return localStorage.setItem('expenseCategories', JSON.stringify(categories));
    }, 
    createExpense: function (selectedCategory, $sum, $comment) {
        return {
            id: generateId(),
            category: selectedCategory,
            sum: $sum.innerText,
            comment: $comment.innerText,
            date: Date.now() // Хранение даты в формате timestamp
        };
    }
};


/* Exports */

export default categoriesStorage;