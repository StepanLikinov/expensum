/**
 * Nodes
 */

const $main: HTMLElement | null = document.getElementById('main');
const $new: HTMLElement | null = document.getElementById('new');
const $list: HTMLElement | null = document.getElementById('list');
const $mainLink: HTMLElement | null = document.getElementById('mainLink');
const $newExpenseLink: HTMLElement | null = 
    document.getElementById('newExpenseLink');
const $expensesListLink: HTMLElement | null = 
    document.getElementById('expensesListLink');

/**
 * Main
 */

interface Page {
    pageElement: HTMLElement | null;
    linkToPage: HTMLElement | null;
}

const pagerConfig: { [key: string]: Page } = {
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
};

/**
 * Exports 
 */

export default pagerConfig;