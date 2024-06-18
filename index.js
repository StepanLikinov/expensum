/**
 * Imports
 */

import Pager from './lib/Pager.js'
import { categoriesList } from './data/categoriesList.js' 
import pagerConfig from './configs/pager.js'
import expensesStorage from './lib/expensesStorage.js';
import categoriesStorage from './lib/categoriesStorage.js';
import generateId from './lib/generateId.js';

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

// Очистка контейнера

const clearContainer = ($сontainer) => {
    $сontainer.innerHTML = '';
};

// Создание элемента категории
const createCategoryElement = (category) => {
    const $categoryDiv = document.createElement('div');
    $categoryDiv.innerText = category.name;
    $categoryDiv.classList.add('category');
    $categoryDiv.dataset.id = category.id;

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

// Создание элемента даты
const createDateElement = (timestamp) => {
    const $dateDiv = document.createElement('div');
    $dateDiv.className = 'date';
    // преобразование даты в читабельный
    const dateObject = new Date(timestamp);
    $dateDiv.innerText = dateObject.toLocaleString(); 

    return $dateDiv;
};

// Создание элемента расхода
const createExpenseElement = (expense) => {
    const $expenseDiv = document.createElement('div');
    $expenseDiv.className = 'expense';
    $expenseDiv.innerText = 
        `Категория: ${expense.category}, Сумма: ${expense.sum}, `
        + `Комментарий: ${expense.comment}`;

    return $expenseDiv;
};

// Рендеринг списка расходов
const renderExpensesList = ($list) => {
    clearContainer($list);
    const expenses = expensesStorage.getAll();

    expenses.forEach(expense => {
        const $dateDiv = createDateElement(expense.date);
        const $expenseDiv = createExpenseElement(expense);
        $dateDiv.appendChild($expenseDiv);
        $list.appendChild($dateDiv);
    });
};

// Создание объекта расхода
const createExpense = () => {
    return {
        id: generateId(),
        category: selectedCategory,
        sum: $sum.innerText,
        comment: $comment.innerText,
        date: Date.now() // Хранение даты в формате timestamp
    };
};

// Обработка отправки формы
const handleSubmit = () => {
    const expense = createExpense();

    expensesStorage.add(expense);
    renderExpensesList($list);
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
    fillCategoriesContainer($categoriesContainer);
    addCategoryEventListeners();
    $submit.addEventListener('click', handleSubmit);
    renderExpensesList($list);
});