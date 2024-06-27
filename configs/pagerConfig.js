/**
 * Nodes
 */

const $nav = document.querySelector('nav');
const $navLinks = $nav.querySelectorAll('li');

const $main = document.getElementById('main')
const $new = document.getElementById('new')
const $list = document.getElementById('list')
const $mainLink = $navLinks[0];
const $newLink = $navLinks[1];
const $listLink = $navLinks[2];

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
        linkToPage: $newLink
    },
    'list': { 
        pageElement: $list,
        linkToPage: $listLink
    }
}

/**
 * Exports 
 */

export default pagerConfig;