/**
 * DateState
 */

class DateState {
    currentValue: Date;

    constructor() {
        this.currentValue = new Date();
    }

    // Установить новую дату
    setCurrentDate(date: Date): void {
        this.currentValue = date;
    }
}

/**
 * Exports
 */

export default DateState;