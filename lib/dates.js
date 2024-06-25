// Создание элемента даты
const createDateElement = (timestamp) => {
    const $dateDiv = document.createElement('div');
    $dateDiv.className = 'date';
    // преобразование даты в читабельный формат
    const dateObject = new Date(timestamp);
    $dateDiv.innerText = dateObject.toLocaleString(); 

    return $dateDiv;
};

export { createDateElement };