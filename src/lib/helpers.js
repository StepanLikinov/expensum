const getCategoryIcon = (categoryName, categories) => {
    const category = 
        categories.find(category => category.name === categoryName);
    return category.iconClass;
};

const formatDate = (date) => new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
});

const loadFromLocalStorage = (key, defaultValue = []) => {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;
    return stored ? JSON.parse(stored) : defaultValue;
};

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const filterExpensesByMonth = (expenses, currentMonth) => {
    return expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const expenseDateStr = expenseDate.toISOString().slice(0, 7); 
        return expenseDateStr.startsWith(currentMonth);
    });
};


export { 
    getCategoryIcon, formatDate, loadFromLocalStorage, 
    saveToLocalStorage, filterExpensesByMonth
};