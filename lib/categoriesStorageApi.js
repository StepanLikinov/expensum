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
    },

    find: function(selectedCategory) {
        const categoriesList = this.getAll();
        return categoriesList.find
            (category => category.name === selectedCategory);
    }
};

/**
 * Exports
 */

export default categoriesStorage;