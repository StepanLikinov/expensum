/**
 * Nodes
 */

const $dateTemplate = document.getElementById('dateTemplate');

/**
 * Functions
 */

// Создание элемента даты
const createDateElement = (timestamp) => {
    const $date = 
        $dateTemplate.content.cloneNode(true).querySelector('.date');
    // преобразование даты в читабельный формат
    const dateObject = new Date(timestamp);
    $date.innerText = dateObject.toLocaleString(); 

    return $date;
};

/**
 * Exports
 */

export { createDateElement };