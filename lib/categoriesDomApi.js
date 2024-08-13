/**
 * Imports
 */

import { clearContainer, clearValue } from './heplers.js';
import categoriesStorage from './categoriesStorageApi.js';
import pager from './pagerInit.js';

/**
 * Nodes
 */
const $categoryTemplate = document.getElementById('category-template')
const $categorySelect = document.getElementById('category-select');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');

/**
 * DOM API
 */

const categoriesDomApi = {
    // Хранения выбранной категории
    selected: null,
    selectedIconClass: null,

    // Установка выбранной категории
    setSelected: function(category) {
        this.selected = category;
    },
    // Установка выбранной категории
    setSelectedIconClass: function(category) {
        this.selectedIconClass = category;
    },

    // Получение выбранной категории
    getSelected: function() {
        return this.selected;
    },

    // Получение класса иконки выбранной категории
    getSelectedIconClass: function() {
        return this.selectedIconClass;
    },

    // Установка категории по умолчанию (для создания расхода через "Новый расход")
    setDefaultInForm: function() {
        const categoriesList = categoriesStorage.getAll();
        this.setSelected(categoriesList[0].name);
        this.setSelectedIconClass(categoriesList[0].iconClass)
        $categorySelect.selectedIndex = 0;
    },

    // "Очистка" формы
    resetForm: function() {
        this.setDefaultInForm();
        clearValue($sum);
        clearValue($comment);
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
            this.setSelectedIconClass(category.iconClass);
            $categorySelect.value = category.id;
            clearValue($sum);
            clearValue($comment);
            pager.showPage('new');
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
    
    // Заполнение caterorySelect
    fillSelect: function($categorySelect) {
        const categoriesList = categoriesStorage.getAll();

        categoriesList.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            $categorySelect.appendChild(option);
            $categorySelect.selectedIndex = 0; // Выбор первой опции по умолчанию
        });

        $categorySelect.addEventListener('change', () => {
            const selectedCategoryId = Number.parseInt($categorySelect.value);
            const selectedCategory = 
                categoriesList.find(
                    category => category.id === selectedCategoryId
                );
            this.setSelected(selectedCategory.name);
            this.setSelectedIconClass(selectedCategory.iconClass)
        });
    } 
} 

/**
 * Exports
 */

export default categoriesDomApi;