// Хранения выбранной категории

let selectedCategory = null;

const setSelectedCategory = (category) => {
    selectedCategory = category;
};

const getSelectedCategory = () => {
    return selectedCategory;
};

export { setSelectedCategory, getSelectedCategory };