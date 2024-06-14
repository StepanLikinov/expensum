const expensesStorage = {
    getExpenses: function() {
        return JSON.parse(localStorage.getItem('expenses')) || []
    },
    saveExpenses: function(expenses) {
        return localStorage.setItem('expenses', JSON.stringify(expenses))
    },
    addExpense: function(expense) {
        const expenses = this.getExpenses();
        expenses.push(expense);
        this.saveExpenses(expenses);
    }
};

export default expensesStorage;