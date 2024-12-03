/**
 * Functions
 */

const clearContainer = ($сontainer: HTMLElement): void => {
    $сontainer.innerHTML = '';
};

const clearValue = ($element: HTMLInputElement | HTMLTextAreaElement): void => {
    $element.value = '';
};

/**
 * Exports
 */

export { clearContainer, clearValue };