/**
 * Nodes 
 * */

const $nav = document.querySelector('nav');
const $navLinks = $nav.querySelectorAll('li');

const $totalAndCategories = document.getElementById('total-and-categories')
const $formOfCreatingExpense = document.getElementById('form-of-creating-expense')
const $expensesList = document.getElementById('expenses-list')
const $mainLink = $navLinks[0];
const $formLink = $navLinks[1];
const $expenseListLink = $navLinks[2];

const pagerConfig = {
    'totalAndCategories': { 
        pageElement: $totalAndCategories, 
        linkToPage: $mainLink 
    },
    'formOfCreatingExpense': { 
        pageElement: $formOfCreatingExpense, 
        linkToPage: $formLink 
    },
    'expensesList': { 
        pageElement: $expensesList,
        linkToPage: $expenseListLink
    }
}

export default pagerConfig;