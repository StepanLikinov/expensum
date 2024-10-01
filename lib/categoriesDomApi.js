/**
 * Imports
 */

import { clearContainer, clearValue } from './heplers.js';
import categoriesStorage from './categoriesStorageApi.js';
import pager from './pagerInit.js';
import expensesDomApi from './expensesDomApi.js';
import navDomApi from './navDomApi.js';

/**
 * Nodes
 */
const $categoryTemplate = document.getElementById('category-template')
const $categorySelect = document.getElementById('category-select');
const $newExpenseLink = document.getElementById('newExpenseLink');

/**
 * DOM API
 */

const categoriesDomApi = {
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

    // Установка категории по умолчанию (для создания расхода через "Новый расход")
    
    setDefaultInForm: function() {
        const categoriesList = categoriesStorage.getAll();
        this.setSelected(categoriesList[0].name);
        $categorySelect.selectedIndex = 0;
    },

    // Создание элемента категории с добавлением обработчика событий
    create: function(category) {
        const $category = 
            $categoryTemplate.content.cloneNode(true).querySelector('.category');
        const $categoryName = $category.querySelector('.category-name');
        const $categoryIcon = 
            $category.querySelector('.category-icon').querySelector('i');

        $categoryName.innerText = category.name;
        $categoryIcon.className = category.iconClass;
        $category.dataset.id = category.id;

        $category.addEventListener('click', () => {
            this.setSelected($category.innerText);
            $categorySelect.value = category.id;
            expensesDomApi.resetForm();
            pager.showPage('new');
            navDomApi.setActive($newExpenseLink)
        });

        return $category;
    },

    // Заполнение categoriesContainer
    
    fillContainer: function($categoriesContainer) {
        clearContainer($categoriesContainer);

        const categoriesList = categoriesStorage.getAll();
    
        categoriesList.forEach(category => {
            const $category = this.create(category);
            $categoriesContainer.appendChild($category);
        });
    },
    
    // Заполнение categorySelect
    fillSelect: function($categorySelect) {
        const categoriesList = categoriesStorage.getAll();

        categoriesList.forEach(category => {
            const $option = document.createElement('option');
            $option.value = category.id;
            $option.text = category.name;
            $categorySelect.appendChild($option);
        });

        $categorySelect.addEventListener('change', () => {
            const selectedCategoryId = Number.parseInt($categorySelect.value);
            const selectedCategory = 
                categoriesList.find(
                    category => category.id === selectedCategoryId
                );
            this.setSelected(selectedCategory.name);
        });
    } 
} 

/**
 * Exports
 */

export default categoriesDomApi;