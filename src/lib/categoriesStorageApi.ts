/**
 * Imports
 */

import { Category, CategoriesStorage } from "./interfaces";

/**
 * Storage
 */

const categoriesStorage: CategoriesStorage = {
    // Хранения выбранной категории
    selected: null,

    // Установка выбранной категории
    setSelected: function(category) {
        this.selected = category;
    },

    // Получение выбранной категории
    getSelected: function() {
        return this.selected;
    },

    getAll: function() { 
        let result: Category[];
        
        const expenseCategoriesJson: string | null = 
            localStorage.getItem('expenseCategories');

        if (expenseCategoriesJson) {
            result = JSON.parse(expenseCategoriesJson); 
        } else {
            result = []; 
        }

        return result;
    },

    saveAll: function(categories) {
        const serializedCategories: string = JSON.stringify(categories);
        localStorage.setItem('expenseCategories', serializedCategories);
    },

    find: function(selectedCategory) {
        const categoriesList: Category[] = this.getAll();
        let result: Category | undefined = categoriesList.find(
            category => category.name === selectedCategory
        );

        return result;
    }
};

/**
 * Exports
 */

export default categoriesStorage;