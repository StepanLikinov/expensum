/**
 * Imports
 */

import { months } from "../data/monthsList.js";

/**
 * Nodes
 */

const $day = document.getElementById('day');
const $calendar = document.getElementById('calendar');

/**
 * Main
 */

const datesDomApi = {
    // Хранение текущей датой
    current: new Date(),

    // преобразование даты в читабельный формат
    format: function(timestamp) {
        const dateObject = new Date(timestamp);
        const day  = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const formattedDate = 
            `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;

        return formattedDate;
    },
    
    // Отображение текущего месяца
    showCurrentMonth: function($target) {
        const currentMonth = this.current.getMonth();
        const currentMonthName = months[currentMonth];
        $target.innerText = currentMonthName;
    },

    // Установка значения в input
    setDayValue: function() {
        $day.value = this.current.toISOString().slice(0, 10);
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