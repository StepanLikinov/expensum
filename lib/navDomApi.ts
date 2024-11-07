/**
 * Imports
 */

import { NavDomApi } from './interfaces'

/**
 * Nodes
 */

const $mainLink: HTMLElement | null = document.getElementById('mainLink');
const $newExpenseLink: HTMLElement | null = 
    document.getElementById('newExpenseLink'); 
const $expensesListLink: HTMLElement | null = 
    document.getElementById('expensesListLink');
const $expenseForm: HTMLElement | null = 
    document.getElementById('expense-form');

/**
 * DOM API
 */

const navDomApi: NavDomApi = {
    setActive: function($clickedLink: HTMLAnchorElement): void {
    let navLinks: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll('.navbar-nav a');

    navLinks.forEach(function($link) {
        $link.classList.remove('text-primary');
    });

    $clickedLink.classList.add('text-primary');
    },

    initIndication: function(): void {
        if ($mainLink instanceof HTMLAnchorElement) {
            navDomApi.setActive($mainLink);
            $mainLink.addEventListener('click', () => {
                navDomApi.setActive($mainLink);
            });
        }
        
        if ($newExpenseLink instanceof HTMLAnchorElement) {
            $newExpenseLink.addEventListener('click', () => {
                navDomApi.setActive($newExpenseLink);
            });
        }
        
        if ($expensesListLink instanceof HTMLAnchorElement) {
            $expensesListLink.addEventListener('click', () => {
                navDomApi.setActive($expensesListLink);
            });
        }
        if ($expenseForm instanceof HTMLFormElement) {
            $expenseForm.addEventListener('submit', () => {
                if ($expensesListLink instanceof HTMLAnchorElement) {
                    navDomApi.setActive($expensesListLink);
                }
            });
        }
    }
}

/* Exports */

export default navDomApi;



