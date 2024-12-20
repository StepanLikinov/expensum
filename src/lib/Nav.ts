/**
 * DOM API
 */

class Nav {
    navLinks: NodeListOf<HTMLAnchorElement>; 
    $mainLink: HTMLElement | null; 
    $newExpenseLink: HTMLElement | null; 
    $expensesListLink: HTMLElement | null; 
    $expenseForm: HTMLElement | null;
    newExpenseLinkClickHandle: () => void;
    expensesListLinkClickHandle: () => void;

    constructor(
        navLinks: NodeListOf<HTMLAnchorElement>, 
        $mainLink: HTMLElement | null, 
        $newExpenseLink: HTMLElement | null, 
        $expensesListLink: HTMLElement | null, 
        $expenseForm: HTMLElement | null,
        newExpenseLinkClickHandle: () => void,
        expensesListLinkClickHandle: () => void
    ) {
        this.navLinks = navLinks;
        this.$mainLink = $mainLink;
        this.$newExpenseLink = $newExpenseLink;
        this.$expensesListLink = $expensesListLink;
        this.$expenseForm = $expenseForm;
        this.newExpenseLinkClickHandle = newExpenseLinkClickHandle;
        this.expensesListLinkClickHandle = expensesListLinkClickHandle;
    }

    setActive($clickedLink: HTMLAnchorElement): void {
        this.navLinks.forEach(function($link) {
            $link.classList.remove('text-primary');
        });

        $clickedLink.classList.add('text-primary');
    }

    initIndication(): void {
        if (this.$mainLink instanceof HTMLAnchorElement) {
            this.setActive(this.$mainLink);
            this.$mainLink.addEventListener('click', () => {
                if (this.$mainLink instanceof HTMLAnchorElement) {
                    this.setActive(this.$mainLink);
                }
            });
        }

        if (this.$newExpenseLink instanceof HTMLAnchorElement) {
            this.$newExpenseLink.addEventListener('click', () => {
                if (this.$newExpenseLink instanceof HTMLAnchorElement) {
                    this.setActive(this.$newExpenseLink);
                }
            });
        }

        if (this.$expensesListLink instanceof HTMLAnchorElement) {
            this.$expensesListLink.addEventListener('click', () => {
                if (this.$expensesListLink instanceof HTMLAnchorElement) {
                    this.setActive(this.$expensesListLink);
                }
            });
        }

        if (this.$expenseForm instanceof HTMLFormElement) {
            this.$expenseForm.addEventListener('submit', () => {
                if (this.$expensesListLink instanceof HTMLAnchorElement) {
                    this.setActive(this.$expensesListLink);
                }
            });
        }
    }
}

/* Exports */

export default Nav;