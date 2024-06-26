/**
 * Nodes
 */

const $dateTemplate = document.getElementById('dateTemplate');

/**
 * Functions
 */

// Создание элемента даты
const createDateElement = (timestamp) => {
    const $dateDiv = 
        $dateTemplate.content.cloneNode(true).querySelector('.date');
    // преобразование даты в читабельный формат
    const dateObject = new Date(timestamp);
    $dateDiv.innerText = dateObject.toLocaleString(); 

    return $dateDiv;
};

/**
 * Exports
 */

export { createDateElement };