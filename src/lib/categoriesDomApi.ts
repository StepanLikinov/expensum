/**
 * Imports
 */

import { Category, CategoriesDomApi } from './interfaces';
import { clearContainer } from './heplers';
import categoriesStorage from './categoriesStorageApi';
import pager from './pagerInit';
import expensesDomApi from './expensesDomApi';
import navDomApi from './navDomApi';

/**
 * Nodes
 */
const $categoryTemplate: HTMLElement | null =
    document.getElementById('category-template');

const $categorySelect: HTMLElement | null = 
    document.getElementById('category-select');

const $newExpenseLink: HTMLElement | null = 
    document.getElementById('newExpenseLink');

/**
 * DOM API
 */

const categoriesDomApi: CategoriesDomApi = {
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
        const categoriesList: Category[] = categoriesStorage.getAll();
        this.setSelected(categoriesList[0].name);
        if ($categorySelect instanceof HTMLSelectElement) {
            $categorySelect.selectedIndex = 0;
        }
    },

    // Создание элемента категории с добавлением обработчика событий
    create: function(category) {
        if (!($categoryTemplate instanceof HTMLTemplateElement)) {
            throw new Error(
                'Template for category element not found in the DOM'
            );
        }

        const $categoryTemplateClone: DocumentFragment = 
            $categoryTemplate.content.cloneNode(true) as DocumentFragment;
            
        const $category: HTMLElement | null = 
            $categoryTemplateClone.querySelector('.category');
        
        if (!$category) {
            throw new Error(
                "Couldn't find .category element in template clone"
            );
        }

        const $categoryName: HTMLElement | null = 
            $category.querySelector('.category-name');

        const $categoryIconElement: HTMLElement | null = 
            $category.querySelector('.category-icon');

        let $categoryIcon: HTMLElement | null = null;

        if ($categoryIconElement) {
            $categoryIcon = $categoryIconElement.querySelector('i');
        }

        if ($categoryName) {
            $categoryName.innerText = category.name;
        }

        if ($categoryIcon) {
            $categoryIcon.className = category.iconClass;
        }
        
        $category.dataset.id = category.id.toString();

        $category.addEventListener('click', () => {
            this.setSelected(category.name);

            if ($categorySelect instanceof HTMLSelectElement) {
                $categorySelect.value = category.id.toString();
            }

            expensesDomApi.resetForm();
            pager.showPage('new');

            if ($newExpenseLink instanceof HTMLAnchorElement) {
                navDomApi.setActive($newExpenseLink)
            }
        });

        return $category;
    },

    // Заполнение categoriesContainer
    fillContainer: function($categoriesContainer) {
        clearContainer($categoriesContainer);

        const categoriesList: Category[] = categoriesStorage.getAll();
    
        categoriesList.forEach(category => {
            const $category: HTMLElement = this.create(category);
            $categoriesContainer.appendChild($category);
        });
    },
    
    // Заполнение categorySelect
    fillSelect: function($categorySelect) {
        const categoriesList: Category[] = categoriesStorage.getAll();

        categoriesList.forEach((category: Category) => {
            const $option: HTMLOptionElement = document.createElement('option');
            $option.value = category.id.toString();
            $option.text = category.name;
            $categorySelect.appendChild($option);
        });

        $categorySelect.addEventListener('change', () => {
            if ($categorySelect instanceof HTMLSelectElement) {
                const selectedCategoryId: number = 
                    Number.parseInt($categorySelect.value);

                const selectedCategory: Category | undefined = 
                    categoriesList.find(
                        (category: Category) => 
                            category.id === selectedCategoryId
                    );

                if (selectedCategory) {
                    this.setSelected(selectedCategory.name);
                }
            }
        });
    } 
} 

/**
 * Exports
 */

export default categoriesDomApi;