/**
 * Imports
 */

import Pager from './lib/Pager.js'
import { categoriesList } from './lib/data.js' 
import pagerConfig from './configs/pager.js'

/**
 * Nodes
*/

const $calendar = document.getElementById('calendar');
const $totalExpences = document.getElementById('total-expences');
const $categoriesContainer = document.getElementById('categories');
const $title = document.getElementById('title');
const $list = document.getElementById('list');
const $selectedCategory = document.getElementById('selected-category');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $submit = document.getElementById('submit');

/**
 * Main
 */

// Сохранения категорий в localStorage
localStorage.setItem('expenseCategories', JSON.stringify(categoriesList));

/* Инициацилизация Pager */
const pager = new Pager(pagerConfig, 'totalAndCategories');

// Заполнение categoriesContainer
let categories = JSON.parse(localStorage.getItem('expenseCategories'));

document.addEventListener('DOMContentLoaded', () => {
    $categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        const $categoryDiv = document.createElement('div');
        $categoryDiv.innerText = category.name;
        $categoryDiv.classList.add('category');
        $categoryDiv.dataset.id = category.id;
        $categoriesContainer.appendChild($categoryDiv);
    });

    // Добавление обработчиков событий для категорий
    const $categories = document.querySelectorAll('.category');
    let selectedCategory = null; 
    
    $categories.forEach($category => {
        $category.addEventListener('click', () => {
            selectedCategory = $category.innerText;
            $selectedCategory.innerText = selectedCategory;
            pager.showPage('formOfCreatingExpense')
        });
    });

    $submit.addEventListener('click', () => {
        const sum = $sum.innerText;
        const comment = $comment.innerText;
        const expense = {
            category: selectedCategory,
            sum: sum,
            comment: comment,
            date: new Date().toLocaleDateString()
        };

        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        updateExpensesList();
        pager.showPage('expensesList')
    });

    const updateExpensesList = () => {
        $list.innerHTML = ''; // Очищаем текущий список
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

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
    }
    updateExpensesList(); 
});