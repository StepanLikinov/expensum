/**
 * Imports
 */

import Pager from './lib/Pager.js'
import { categories } from './lib/data.js' 
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

localStorage.setItem('expenseCategories', JSON.stringify(categories));

document.addEventListener('DOMContentLoaded', () => {

    // Заполнение categoriesContainer
    let categories = JSON.parse(localStorage.getItem('expenseCategories'));

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
    
    $categories.forEach($category => {
        $category.addEventListener('click', () => {
            const selectedCategory = $category.innerText;
            localStorage.setItem('selectedCategory', selectedCategory);
            pager.showPage('formOfCreatingExpense')
        });
    });
});

/* Инициацилизация Pager */

const pager = new Pager(pagerConfig, 'totalAndCategories');

document.addEventListener('DOMContentLoaded', () => {
    const selectedCategory = localStorage.getItem('selectedCategory');
    $selectedCategory.innerText = selectedCategory;

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

        pager.showPage('expensesList')
    })
})

document.addEventListener('DOMContentLoaded', () => {
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
});