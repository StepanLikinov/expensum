/**
 * Storage
 */

const categoriesStorage = {
    // TODO:
    getAll: function() { 
        return JSON.parse(localStorage.getItem('expenseCategories')) || [];
    },
    
    // TODO:
    saveAll: function(categories) {
        return localStorage.setItem(
            'expenseCategories', JSON.stringify(categories)
        );
    },

    // TODO:
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