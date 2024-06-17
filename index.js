/**
 * Imports
 */

import Pager from './lib/Pager.js'
import { categoriesList } from './lib/data.js' 
import pagerConfig from './configs/pager.js'
import expensesStorage from './lib/expensesStorage.js';
import categoriesStorage from './lib/categoriesStorage.js';

/**
 * Main
 */

/**
 * Nodes
 */

const $categoriesContainer = document.getElementById('categories');
const $list = document.getElementById('list');
const $selectedCategory = document.getElementById('selected-category');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $submit = document.getElementById('submit');

/**
 * Functions
 */

// Заполнение categoriesContainer
const fillCategoriesContainer = () => {
    const categories = categoriesStorage.getAll();
    $categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        const $categoryDiv = document.createElement('div');
        $categoryDiv.innerText = category.name;
        $categoryDiv.classList.add('category');
        $categoryDiv.dataset.id = category.id;
        $categoriesContainer.appendChild($categoryDiv);
    });
};

// Добавление обработчиков событий для категорий
const addCategoryEventListeners = () => {
    const $categories = document.querySelectorAll('.category');
    
    $categories.forEach($category => {
        $category.addEventListener('click', () => {
            selectedCategory = $category.innerText;
            $selectedCategory.innerText = selectedCategory;
            pager.showPage('formOfCreatingExpense');
        });
    });
};
    
// Обновления списка расходов
const updateExpensesList = () => {
    $list.innerHTML = '';
    const expenses = expensesStorage.getAll();

    expenses.forEach(expense => {
        const $dateDiv = document.createElement('div');
        $dateDiv.className = 'date';
        $dateDiv.innerText = expense.date;

        const $expenseDiv = document.createElement('div');
        $expenseDiv.className = 'expense';
        $expenseDiv.innerText = 
            `Категория: ${expense.category}, Сумма: ${expense.sum}, `
            + `Комментарий: ${expense.comment}`;

        $dateDiv.appendChild($expenseDiv);
        $list.appendChild($dateDiv);
    });
};

// Обработка отправки формы
const handleSubmit = () => {
    const sum = $sum.innerText;
    const comment = $comment.innerText;

    const expense = {
        category: selectedCategory,
        sum: sum,
        comment: comment,
        date: new Date().toLocaleDateString()
    };

    expensesStorage.add(expense);
    updateExpensesList();
    pager.showPage('expensesList');
};

/**
 * Run
 */

/* Init */

// Сохранения категорий в localStorage
categoriesStorage.saveAll(categoriesList);

//  Инициацилизация Pager
const pager = new Pager(pagerConfig, 'totalAndCategories', 'flex');

// Хранения выбранной категории
let selectedCategory = null;

/* Calls */

document.addEventListener('DOMContentLoaded', () => {
    fillCategoriesContainer();
    addCategoryEventListeners();
    $submit.addEventListener('click', handleSubmit);
    updateExpensesList();
});