/**
 * Imports
 */

import { clearValue } from "./heplers.js";
import categoriesDomApi from "./categoriesDomApi.js";

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
        categoriesDomApi.setDefault();
        clearValue($sum);
        clearValue($comment);
    });
}

/**
 * Exports
 */

export { handleNewLinkClick };