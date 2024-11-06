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
const $categoryTemplate: HTMLTemplateElement | null =
    document.getElementById('category-template') as HTMLTemplateElement;
const $categorySelect: HTMLSelectElement | null = 
    document.getElementById('category-select') as HTMLSelectElement;
const $newExpenseLink: HTMLAnchorElement | null = 
    document.getElementById('newExpenseLink') as HTMLAnchorElement;

/**
 * Interfaces
 */

interface Category {
    id: number;
    name: string;
    iconClass: string;
}

interface CategoriesDomApi {
    selected: string | null;
    setSelected(category: string): void;
    getSelected(): string | null;
    setDefaultInForm(): void;
    create(category: Category): HTMLElement;
    fillContainer($categoriesContainer: HTMLElement): void;
    fillSelect($categorySelect: HTMLSelectElement): void;
}

/**
 * DOM API
 */

const categoriesDomApi: CategoriesDomApi = {
    // Хранения выбранной категории
    
    selected: null,

    // Установка выбранной категории
    
    setSelected: function(category: string): void {
        this.selected = category;
    },

    // Получение выбранной категории
    
    getSelected: function(): string | null {
        return this.selected;
    },

    // Установка категории по умолчанию (для создания расхода через "Новый расход")
    
    setDefaultInForm: function(): void {
        const categoriesList: Category[] = categoriesStorage.getAll();
        this.setSelected(categoriesList[0].name);
        if ($categorySelect) {
            $categorySelect.selectedIndex = 0;
        }
    },

    // Создание элемента категории с добавлением обработчика событий
    create: function(category: Category): HTMLElement {
        const $category: HTMLElement = 
            ($categoryTemplate.content.cloneNode(true) as DocumentFragment)
            .querySelector('.category') as HTMLElement;

        const $categoryName: HTMLElement | null = 
            $category.querySelector('.category-name') as HTMLElement;

        const $categoryIconElement: HTMLElement | null = 
            $category.querySelector('.category-icon');

        let $categoryIcon: HTMLElement | null = null;

        if ($categoryIconElement) {
            $categoryIcon = 
                $categoryIconElement.querySelector('i') as HTMLElement | null;
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
            if ($categorySelect) {
                $categorySelect.value = category.id.toString();
            }
            expensesDomApi.resetForm();
            pager.showPage('new');
            navDomApi.setActive($newExpenseLink)
        });

        return $category;
    },

    // Заполнение categoriesContainer
    
    fillContainer: function($categoriesContainer: HTMLElement): void {
        clearContainer($categoriesContainer);

        const categoriesList: Category[] = categoriesStorage.getAll();
    
        categoriesList.forEach(category => {
            const $category: HTMLElement = this.create(category);
            $categoriesContainer.appendChild($category);
        });
    },
    
    // Заполнение categorySelect
    fillSelect: function($categorySelect: HTMLElement): void {
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
                        category => category.id === selectedCategoryId
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