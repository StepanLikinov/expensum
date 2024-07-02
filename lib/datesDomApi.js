/**
 * Imports
 */

import { months } from "../data/monthsList.js";

/**
 * Nodes
 */

const $dateTemplate = document.getElementById('date-template');

/**
 * Main
 */

const datesDomApi = {
    // Хранение текущей датой
    current: new Date(),

    // Создание элемента даты
    create: function(timestamp) {
        const $date = 
        $dateTemplate.content.cloneNode(true).querySelector('.date');
        // преобразование даты в читабельный формат
        const dateObject = new Date(timestamp);
        $date.innerText = dateObject.toLocaleString(); 

        return $date;
    },
    // Отображение текущего месяца
    showCurrentMonth: function($target) {
        const currentMonth = this.current.getMonth();
        const currentMonthName = months[currentMonth];
        $target.innerText = currentMonthName;
    }
}

/**
 * Exports
 */

export default datesDomApi;