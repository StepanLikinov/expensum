/**
 * Nodes
 */

const $dateTemplate = document.getElementById('date-template');

/**
 * Main
 */

const datesDomApi = {
    // Создание элемента даты
    create: function(timestamp) {
        const $date = 
        $dateTemplate.content.cloneNode(true).querySelector('.date');
    // преобразование даты в читабельный формат
    const dateObject = new Date(timestamp);
    $date.innerText = dateObject.toLocaleString(); 

    return $date;
    }
}

/**
 * Exports
 */

export default datesDomApi;