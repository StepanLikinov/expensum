/**
 * State
 */

// Хранения выбранной категории
let selectedCategory = null;

/**
 * Functions
 */

const setSelectedCategory = (category) => {
    selectedCategory = category;
};
const getSelectedCategory = () => {
    return selectedCategory;
};

/**
 * Exports
 */

export { setSelectedCategory, getSelectedCategory };