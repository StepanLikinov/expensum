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
    return stored ? JSON.parse(stored) : defaultValue;
};

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export { 
    getCategoryIcon, formatDate, loadFromLocalStorage, saveToLocalStorage 
};