/**
 * Imports
 */

import { clearContainer, clearValue } from './heplers.js';
import { setSelectedCategory, getSelectedCategory } from '../data/state.js';
import pager from './pagerInit.js';

/**
 * Nodes
 */
const $categoryTemplate = document.getElementById('categoryTemplate')
const $categorySelect = document.getElementById('category-select');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');

/**
 * Storage
 */

const categoriesStorage = {
    getAll: function() { 
        return JSON.parse(localStorage.getItem('expenseCategories')) || [];
    },
    saveAll: function(categories) {
        return localStorage.setItem(
            'expenseCategories', JSON.stringify(categories)
        );
    }
};

/**
 * Functions
 */

// Установка категории по умолчанию (для создания расхода через "Новый расход")
const setDefaultCategory = () => {
    const categories = categoriesStorage.getAll();
    setSelectedCategory(categories[0].name);
    $categorySelect.selectedIndex = 0;
}

// Создание элемента категории с добавлением обработчика событий
const createCategoryElement = (category) => {
    const $categoryDiv = 
        $categoryTemplate.content.cloneNode(true).querySelector('.category');
    $categoryDiv.innerText = category.name;
    $categoryDiv.dataset.id = category.id;

    $categoryDiv.addEventListener('click', () => {
        setSelectedCategory($categoryDiv.innerText);
        $categorySelect.value = category.id;
        clearValue($sum);
        clearValue($comment);
        pager.showPage('new');
    });

    return $categoryDiv;
};

// Заполнение categoriesContainer
const fillCategoriesContainer = ($categoriesContainer) => {
    const categories = categoriesStorage.getAll();
    clearContainer($categoriesContainer);

    categories.forEach(category => {
        const $categoryDiv = createCategoryElement(category);
        $categoriesContainer.appendChild($categoryDiv);
    });
};

// Заполнение categorySelect 
const fillCategoriesSelect = ($categorySelect) => {
    const categories = categoriesStorage.getAll();

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.name;
        $categorySelect.appendChild(option);
        $categorySelect.selectedIndex = 0; // Выбор первой опции по умолчанию
    });

    $categorySelect.addEventListener('change', () => {
        const selectedCategoryId = Number.parseInt($categorySelect.value);
        const selectedCategory = 
            categories.find(category => category.id === selectedCategoryId);
        setSelectedCategory(selectedCategory.name);
    });

};

/**
 * Exports
 */

export { categoriesStorage, 
    setDefaultCategory, 
    fillCategoriesContainer, 
    fillCategoriesSelect };