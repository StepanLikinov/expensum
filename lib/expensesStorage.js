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
    }
};

export default expensesStorage;