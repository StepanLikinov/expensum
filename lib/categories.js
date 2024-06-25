/* Imports */

import generateId from './generateId.js';
import { clearContainer } from './heplers.js';
import { setSelectedCategory, getSelectedCategory } from '../data/state.js';
import Pager from '../lib/Pager.js';
import pagerConfig from '../configs/pager.js';

/* Nodes */

const $selectedCategory = document.getElementById('selected-category');

//  Инициацилизация Pager
const pager = new Pager(pagerConfig, 'main', 'flex');

/* Storage */

const categoriesStorage = {
    getAll: function() { 
        return JSON.parse(localStorage.getItem('expenseCategories')) || [];
    },
    saveAll: function(categories) {
        return localStorage.setItem('expenseCategories', JSON.stringify(categories));
    }, 
    createExpense: function (selectedCategory, $sum, $comment) {
        return {
            id: generateId(),
            category: selectedCategory,
            sum: $sum.innerText,
            comment: $comment.innerText,
            date: Date.now() // Хранение даты в формате timestamp
        };
    }
};

/* Functions */

// Создание элемента категории с добавлением обработчика событий
const createCategoryElement = (category) => {
    const $categoryDiv = document.createElement('div');
    $categoryDiv.innerText = category.name;
    $categoryDiv.classList.add('category');
    $categoryDiv.dataset.id = category.id;

    $categoryDiv.addEventListener('click', () => {
        setSelectedCategory($categoryDiv.innerText);
        $selectedCategory.innerText = getSelectedCategory();
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

/* Exports */

export { categoriesStorage, createCategoryElement, fillCategoriesContainer };