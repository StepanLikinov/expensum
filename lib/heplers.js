/**
 * Functions
 */

const clearContainer = ($сontainer) => {
    $сontainer.innerHTML = '';
};

const clearValue = ($element) => {
    $element.value = '';
};

/**
 * Exports
 */

export { clearContainer, clearValue };