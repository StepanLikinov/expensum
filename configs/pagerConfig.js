/**
 * Nodes
 */

const $nav = document.querySelector('nav');
const $navLinks = $nav.querySelectorAll('li');

const $main = document.getElementById('main')
const $new = document.getElementById('new')
const $list = document.getElementById('list')
const $mainLink = document.getElementById('mainLink');
const $newExpenseLink = document.getElementById('newExpenseLink');
const $expensesListLink = document.getElementById('expensesListLink');

/**
 * Main
 */

const pagerConfig = {
    'main': { 
        pageElement: $main, 
        linkToPage: $mainLink 
    },
    'new': { 
        pageElement: $new, 
        linkToPage: $newExpenseLink
    },
    'list': { 
        pageElement: $list,
        linkToPage: $expensesListLink
    }
}

/**
 * Exports 
 */

export default pagerConfig;