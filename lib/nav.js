/**
 * Imports
 */

import { clearValue } from "./heplers.js";
import { setDefaultCategory } from "./categories.js";

/**
 * Nodes
 */

const $nav = document.querySelector('nav');
const $navLinks = $nav.querySelectorAll('li');
const $mainLink = $navLinks[0];
const $newLink = $navLinks[1];
const $listLink = $navLinks[2];

const $sum = document.getElementById('sum');
const $comment = document.getElementById('comment');

/**
 * Functions
 */

const handleNewLinkClick = () => {
    $newLink.addEventListener('click', () => {
        setDefaultCategory();
        clearValue($sum);
        clearValue($comment);
    });
}

/**
 * Exports
 */

export { handleNewLinkClick };