const getCategoryIcon = (categoryName, categories) => {
    const category = 
        categories.find(category => category.name === categoryName);
    return category.iconClass;
};

const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
    });
};

export { getCategoryIcon, formatDate}