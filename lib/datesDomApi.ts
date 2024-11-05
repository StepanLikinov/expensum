/**
 * Imports
 */

import { months } from "../data/monthsList.js";

/**
 * Nodes
 */

const $day: HTMLInputElement | null = 
    document.getElementById('day') as HTMLInputElement;
const $calendar: HTMLInputElement | null = 
    document.getElementById('calendar') as HTMLInputElement;


/**
 * Interfaces
 */

interface DatesDomApi {
    current: Date;
    create: (timestamp: number) => string;
    showCurrentMonth: (target: HTMLElement) => void;
    setDayValue: () => void;
    setCalendarValue: () => void;
}

/**
 * Main
 */

const datesDomApi: DatesDomApi = {
    // Хранение текущей датой
    current: new Date(),

    // Создание элемента даты
    create: function(timestamp: number): string {
        const $date: HTMLElement  = document.createElement('div');

        // преобразование даты в читабельный формат
        const dateObject: Date = new Date(timestamp);
        const day: number = dateObject.getDate();
        const month: number = dateObject.getMonth() + 1;
        const formattedDate: string = 
            `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;

        return formattedDate;
    },
    
    // Отображение текущего месяца
    showCurrentMonth: function($target: HTMLElement): void {
        const currentMonth: number = this.current.getMonth();
        const currentMonthName: string = months[currentMonth];
        $target.innerText = currentMonthName;
    },

    // Установка значения в input
    setDayValue: function():void {
        if ($day){
            $day.value = this.current.toISOString().slice(0, 10);
        }
    },

    // Установка значения в календарь
    setCalendarValue: function(): void {
        const currentMonth: number  = this.current.getMonth() + 1;
        const currentYear: number  = this.current.getFullYear();
        const monthsString: string  = 
            currentMonth < 10 ? '0' + currentMonth : currentMonth.toString();
        const formattedValue: string = `${currentYear}-${monthsString}`;
        $calendar.value = formattedValue;
    }
}

/**
 * Exports
 */

export default datesDomApi;