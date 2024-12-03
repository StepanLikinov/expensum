/**
 * Imports
 */

import { DatesDomApi } from "./interfaces.js";
import { months } from "../data/monthsList.js";

/**
 * Nodes
 */

const $day: HTMLElement | null = document.getElementById('day');
const $calendar: HTMLElement | null = document.getElementById('calendar');

/**
 * Main
 */

const datesDomApi: DatesDomApi = {
    // Хранение текущей датой
    current: new Date(),

    // преобразование даты в читабельный формат
    format: function(timestamp) {
        const dateObject: Date = new Date(timestamp);
        const day: number = dateObject.getDate();
        const month: number = dateObject.getMonth() + 1;

        const formattedDate: string = 
            `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;

        return formattedDate;
    },
    
    // Отображение текущего месяца
    showCurrentMonth: function($target) {
        const currentMonth: number = this.current.getMonth();
        const currentMonthName: string = months[currentMonth];
        $target.innerText = currentMonthName;
    },

    // Установка значения в input
    setDayValue: function() {
        if ($day instanceof HTMLInputElement){
            $day.value = this.current.toISOString().slice(0, 10);
        }
    },

    // Установка значения в календарь
    setCalendarValue: function() {
        const currentMonth: number  = this.current.getMonth() + 1;
        const currentYear: number  = this.current.getFullYear();

        const monthsString: string  = 
            currentMonth < 10 ? '0' + currentMonth : currentMonth.toString();

        const formattedValue: string = `${currentYear}-${monthsString}`;

        if ($calendar instanceof HTMLInputElement){
            $calendar.value = formattedValue;
        }
    }
}

/**
 * Exports
 */

export default datesDomApi;