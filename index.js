/**
 * Nodes
*/

const $calendar = document.getElementById('calendar');
const $totalExpences = document.getElementById('total-expences');
const $categoriesContainer = document.getElementById('categories');
const $categories = document.querySelectorAll('#categories div')
const $title = document.getElementById('title');
const $list = document.getElementById('list');
const $selectedCategory = document.getElementById('selected-category');
const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');
const $submit = document.getElementById('submit');

/**
 * Main
 */

$categories.forEach($category => {
    $category.addEventListener('click', () => {
        const selectedCategory = $category.innerText;
        localStorage.setItem('selectedCategory', selectedCategory);
        window.location.href = './form of creating expense.html';
    });
});

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

        window.location.href = './expenses list.html';
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
            `Категория: ${expense.category}, Сумма: ${expense.sum},` 
                + `Комментарий: ${expense.comment}`;

        $dateDiv.appendChild($expenseDiv);
        $list.appendChild($dateDiv);
    });
});