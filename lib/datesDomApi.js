/**
 * Imports
 */

import { months } from "../data/monthsList.js";

/**
 * Nodes
 */

const $dateTemplate = document.getElementById('date-template');
const $calendar = document.getElementById('calendar');

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
        const day  = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const formattedDate = 
            `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;
        $date.innerText = formattedDate;

        return $date;
    },
    
    // Отображение текущего месяца
    showCurrentMonth: function($target) {
        const currentMonth = this.current.getMonth();
        const currentMonthName = months[currentMonth];
        $target.innerText = currentMonthName;
    },

    // Установка значения в календарь
    setCalendarValue: function() {
        const currentMonth = this.current.getMonth() + 1;
        const currentYear = this.current.getFullYear();
        const monthsString = 
            currentMonth < 10 ? '0' + currentMonth : currentMonth.toString();
        const formattedValue = `${currentYear}-${monthsString}`;
        $calendar.value = formattedValue;
    }
}

/**
 * Exports
 */

export default datesDomApi;