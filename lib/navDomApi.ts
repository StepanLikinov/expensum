/**
 * Nodes
 */

const $mainLink: HTMLAnchorElement | null = document.getElementById('mainLink') as HTMLAnchorElement;
const $newExpenseLink: HTMLAnchorElement | null = 
    document.getElementById('newExpenseLink') as HTMLAnchorElement; 
const $expensesListLink: HTMLAnchorElement | null = 
    document.getElementById('expensesListLink') as HTMLAnchorElement;
const $expenseForm: HTMLFormElement | null = 
    document.getElementById('expense-form') as HTMLFormElement;

/**
 * Interfaces
 */

interface NavDomApi {
    setActive: ($clickedLink: HTMLAnchorElement) => void;
    initIndication: () => void;
}

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
        if ($mainLink) {
            navDomApi.setActive($mainLink);
            $mainLink.addEventListener('click', () => {
                navDomApi.setActive($mainLink);
            });
        }
        
        if ($newExpenseLink) {
            $newExpenseLink.addEventListener('click', () => {
                navDomApi.setActive($newExpenseLink);
            });
        }
        
        if ($expensesListLink) {
            $expensesListLink.addEventListener('click', () => {
                navDomApi.setActive($expensesListLink);
            });
        }
        if ($expenseForm) {
            $expenseForm.addEventListener('submit', () => {
                if ($expensesListLink) {
                    navDomApi.setActive($expensesListLink);
                }
            });
        }
    }
}

/* Exports */

export default navDomApi;



