/**
 * Imports
 */

import { months } from "../data/monthsList";
import DateState from "./DateState";

/**
 * Main
 */

class DatesDomApi {
    dateState: DateState;
    $day: HTMLElement | null;
    $calendar: HTMLElement | null;

    constructor($day: HTMLElement | null, $calendar: HTMLElement | null) {
        this.dateState = new DateState();
        this.$day = $day;
        this.$calendar = $calendar;
    }

    // Отображение текущего месяца
    showCurrentMonth($target: HTMLElement): void {
        const currentMonth: number = this.dateState.currentValue.getMonth();
        const currentMonthName: string = months[currentMonth];
        $target.innerText = currentMonthName;
    }

    // Установка значения в input
    setDayValue(): void {
        if (this.$day instanceof HTMLInputElement){
            this.$day.value = 
                this.dateState.currentValue.toISOString().slice(0, 10);
        }
    }

    // Установка значения в календарь
    setCalendarValue(): void {
        const currentMonth: number  = 
            this.dateState.currentValue.getMonth() + 1;
        const currentYear: number  = 
            this.dateState.currentValue.getFullYear();

        const monthsString: string  = 
            currentMonth < 10 ? '0' + currentMonth : currentMonth.toString();

        const formattedValue: string = `${currentYear}-${monthsString}`;

        if (this.$calendar instanceof HTMLInputElement){
            this.$calendar.value = formattedValue;
        }
    }
}

/**
 * Exports
 */

export default DatesDomApi;