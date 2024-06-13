/**
 * Nodes 
 * */

const $totalAndCategories = document.getElementById('total-and-categories')
const $formOfCreatingExpense = document.getElementById('form-of-creating-expense')
const $expensesList = document.getElementById('expenses-list')
const $mainLink = document.getElementById('main-page')
const $formLink = document.getElementById('form-page')
const $expenseListLink = document.getElementById('expenses-list-page')

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