/**
 * Imports
 */

import { Category, CategoriesStorage } from './interfaces';
import { clearContainer, resetForm } from './heplers';
import categoriesStorage from './categoriesStorageApi';
import pager from './pagerInit';
import navDomApi from './navDomApi';

/**
 * Nodes
 */
const $newExpenseLink: HTMLElement | null = 
    document.getElementById('newExpenseLink');

const $sum: HTMLElement | null = document.getElementById('sum');
const $comment: HTMLElement | null = document.getElementById('comment');  

/**
 * DOM API
 */

class CategoriesDomApi {
    categoriesStorage: CategoriesStorage;
    $categoryTemplate: HTMLElement | null;
    $categorySelect: HTMLElement | null;

    constructor(
        $categoryTemplate: HTMLElement | null,
        $categorySelect: HTMLElement | null
    ) {
        this.categoriesStorage = categoriesStorage;
        this.$categoryTemplate = $categoryTemplate;
        this.$categorySelect = $categorySelect;
    }

    setDefaultInForm(): void {
        const categoriesList: Category[] = categoriesStorage.getAll();
        this.categoriesStorage.setSelected(categoriesList[0].name);
        if (this.$categorySelect instanceof HTMLSelectElement) {
            this.$categorySelect.selectedIndex = 0;
        }
    }

    // Создание элемента категории с добавлением обработчика событий
    create(category: Category): HTMLElement {
        if (!(this.$categoryTemplate instanceof HTMLTemplateElement)) {
            throw new Error(
                'Template for category element not found in the DOM'
            );
        }

        const $categoryTemplateClone: DocumentFragment = 
            this.$categoryTemplate.content.cloneNode(true) as DocumentFragment;
            
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
            this.categoriesStorage.setSelected(category.name);
            
            if (this.$categorySelect instanceof HTMLSelectElement) {
                this.$categorySelect.value = category.id.toString();
            }

            resetForm($sum, $comment);
            pager.showPage('new');

            if ($newExpenseLink instanceof HTMLAnchorElement) {
                navDomApi.setActive($newExpenseLink)
            }
        });

        return $category;
    }

    // Заполнение categoriesContainer
    fillContainer($categoriesContainer: HTMLElement): void {
        clearContainer($categoriesContainer);

        const categoriesList: Category[] = categoriesStorage.getAll();
    
        categoriesList.forEach(category => {
            const $category: HTMLElement = this.create(category);
            $categoriesContainer.appendChild($category);
        });
    }

    // Заполнение categorySelect
    fillSelect($categorySelect: HTMLSelectElement): void {
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
                    this.categoriesStorage.setSelected(selectedCategory.name);
                }
            }
        });
    }
}

/**
 * Exports
 */

export default CategoriesDomApi;