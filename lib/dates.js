/* Nodes */

const $dateTemplate = document.getElementById('dateTemplate');

// Создание элемента даты
const createDateElement = (timestamp) => {
    const $dateDiv = $dateTemplate.content.cloneNode(true).querySelector('.date');
    // преобразование даты в читабельный формат
    const dateObject = new Date(timestamp);
    $dateDiv.innerText = dateObject.toLocaleString(); 

    return $dateDiv;
};

export { createDateElement };