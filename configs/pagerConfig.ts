/**
 * Imports
 */

import { Page } from "../lib/interfaces";

/**
 * Nodes
 */

const $main: HTMLElement | null = document.getElementById('main');
const $new: HTMLElement | null = document.getElementById('new');
const $list: HTMLElement | null = document.getElementById('list');
const $mainLink: HTMLAnchorElement | null = 
    document.getElementById('mainLink') as HTMLAnchorElement;
const $newExpenseLink: HTMLAnchorElement | null = 
    document.getElementById('newExpenseLink') as HTMLAnchorElement;
const $expensesListLink: HTMLAnchorElement | null = 
    document.getElementById('expensesListLink') as HTMLAnchorElement;

/**
 * Main
 */


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