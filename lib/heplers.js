/**
 * Functions
 */

const clearContainer = ($сontainer) => {
    $сontainer.innerHTML = '';
};

const clearValue = ($element) => {
    $element.value = '';
};

const setActive = ($clickedLink) => {
    let navLinks = document.querySelectorAll('.navbar-nav a');

    navLinks.forEach(($link) => {
        $link.classList.remove('text-primary');
    });

    $clickedLink.classList.add('text-primary');
}
/**
 * Exports
 */

export { clearContainer, clearValue, setActive };