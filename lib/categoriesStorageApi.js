/**
 * Storage
 */

const categoriesStorage = {
    getAll: function() { 
        return JSON.parse(localStorage.getItem('expenseCategories')) || [];
    },
    
    saveAll: function(categories) {
        return localStorage.setItem(
            'expenseCategories', JSON.stringify(categories)
        );
    }
};

/**
 * Exports
 */

export default categoriesStorage;