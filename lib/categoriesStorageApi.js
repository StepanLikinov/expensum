/**
 * Storage
 */

const categoriesStorage = {
    getAll: function() { 
        let result;
        const expenseCategoriesJson = localStorage.getItem('expenseCategories');
        const expenseCategories = JSON.parse(expenseCategoriesJson);

        if (expenseCategories == null){
            result = [];
        } else {
            result = expenseCategories;
        }

        return result;
    },

    saveAll: function(categories) {
        const categoriesString = JSON.stringify(categories);
        localStorage.setItem('expenseCategories', categoriesString);
    },

    find: function(selectedCategory) {
        const categoriesList = this.getAll();
        let result = categoriesList.find(
            category => category.name === selectedCategory
        );

        return result;
    }
};

/**
 * Exports
 */

export default categoriesStorage;