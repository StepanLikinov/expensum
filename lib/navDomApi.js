/**
 * Nodes
 */

const $mainLink = document.getElementById('mainLink')
const $newExpenseLink = document.getElementById('newExpenseLink');
const $expensesListLink = document.getElementById('expensesListLink');
const $expenseForm = document.getElementById('expense-form');

/**
 * DOM API
 */

const navDomApi = {
    setActive: function($clickedLink) {
    let navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(function($link) {
        $link.classList.remove('text-blue-500');
    });

    $clickedLink.classList.add('text-blue-500');
    },

    initIndication: function() {
        navDomApi.setActive($mainLink);

        $mainLink.addEventListener('click', () => {
            navDomApi.setActive($mainLink);
        });
        $newExpenseLink.addEventListener('click', () => {
            navDomApi.setActive($newExpenseLink);
        });
        $expensesListLink.addEventListener('click', () => {
            navDomApi.setActive($expensesListLink);
        });
        $expenseForm.addEventListener('submit', () => {
            navDomApi.setActive($expensesListLink);
        });
    }
}

/* Exports */

export default navDomApi;



