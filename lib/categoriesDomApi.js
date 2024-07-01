/**
 * Imports
 */

import { clearContainer, clearValue } from './heplers.js';
import { setSelectedCategory } from '../data/state.js';
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
 * Functions
 */

const categoriesDomApi = {
    list: categoriesStorage.getAll(),

    // Установка категории по умолчанию (для создания расхода через "Новый расход")
    setDefault: function() {
        // const categories = categoriesStorage.getAll();
        setSelectedCategory(this.list[0].name);
        $categorySelect.selectedIndex = 0;
    },
    // Создание элемента категории с добавлением обработчика событий
    create: function(category) {
        const $category = 
        $categoryTemplate.content.cloneNode(true).querySelector('.category');
        $category.innerText = category.name;
        $category.dataset.id = category.id;

        $category.addEventListener('click', () => {
            setSelectedCategory($category.innerText);
            $categorySelect.value = category.id;
            clearValue($sum);
            clearValue($comment);
            pager.showPage('new');
        });

        return $category;
    },
    // Заполнение categoriesContainer
    fillContainer: function($categoriesContainer) {
        // const categories = categoriesStorage.getAll();
        clearContainer($categoriesContainer);
    
        this.list.forEach(category => {
            const $category = this.create(category);
            $categoriesContainer.appendChild($category);
        });
    },
    fillSelect: function($categorySelect) {
        // const categories = categoriesStorage.getAll();

        this.list.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            $categorySelect.appendChild(option);
            $categorySelect.selectedIndex = 0; // Выбор первой опции по умолчанию
        });

        $categorySelect.addEventListener('change', () => {
            const selectedCategoryId = Number.parseInt($categorySelect.value);
            const selectedCategory = 
                this.list.find(category => category.id === selectedCategoryId);
            setSelectedCategory(selectedCategory.name);
        });
    } 
} 

/**
 * Exports
 */

export default categoriesDomApi;