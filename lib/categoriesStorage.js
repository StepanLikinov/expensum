const categoriesStorage = {
    getCategories: function() { 
        return JSON.parse(localStorage.getItem('expenseCategories')) || [];
    },
    saveCategories: function(categories) {
        return localStorage.setItem('expenseCategories', JSON.stringify(categories));
    }
};

export default categoriesStorage;