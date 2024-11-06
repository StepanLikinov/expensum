/**
 * Imports
 */

import generateId from './generateId.js';
import datesDomApi from './datesDomApi.js';
import categoriesStorage from './categoriesStorageApi.js';

/**
 * Interfaces
 */

interface Expense {
    id: string;
    date: Date;
    category: string;
    categoryId: number;
    sum: number;
    comment?: string; // Комментарий может быть необязательным
}

interface ExpensesStorage {
    getAll(): Expense[];
    saveAll(expenses: Expense[]): void;
    add(expense: Expense): void;
    create(
        date: number, 
        selectedCategory: string,
        sum: string,
        comment?: string
    ): Expense;
    getByMonth(month: number): Expense[];
    getCurrentMonth(): Expense[];
    calculateTotal(expensesPeriod: Expense[]): number;
}

/**
 * Storage
 */

const expensesStorage: ExpensesStorage = {
    getAll: function(): Expense[] {
        let result: Expense[];
        const expensesJson: string | null = localStorage.getItem('expenses');

        if (expensesJson) {
            result = JSON.parse(expensesJson);
        } else {
            result = [];
        }

        return result;
    },

    saveAll: function(expenses: Expense[]): void {
        const serializedExpenses: string = JSON.stringify(expenses);
        localStorage.setItem('expenses', serializedExpenses);
    },

    add: function(expense: Expense): void {
        const expenses: Expense[] = this.getAll();
        expenses.push(expense);
        this.saveAll(expenses);
    },

    create: function (
        date: Date, 
        selectedCategory: string,
        sum: string,
        comment?: string
    ): Expense {
        const category = categoriesStorage.find(selectedCategory);

        if (category !== undefined) {
            const categoryId = category.id;

            return {
                id: generateId(),
                date: date,
                category: selectedCategory,
                categoryId: categoryId,
                sum: Number.parseFloat(sum),
                comment: comment
            };
        } else {
            throw new Error(`Category ${selectedCategory} not found`);
        }
    },

    // Получение расходов по выбранному месяцу
    getByMonth: function(month: number): Expense[] {
        const expenses: Expense[] = this.getAll();
        const selectedMonthExpenses: Expense[] = 
            expenses.filter(function(expense: Expense) {
                const expenseDate: Date = new Date(expense.date);
                const expenseMonth: number = expenseDate.getMonth();

                return expenseMonth === month;
            });
        
            return selectedMonthExpenses;
    },

    // Получение расходов текущего месяца
    getCurrentMonth: function(): Expense[] {
        const currentMonthExpenses: Expense[] = 
            this.getByMonth(datesDomApi.current.getMonth());

        return currentMonthExpenses;
    },

    // Расчет суммы расходов за период
    calculateTotal: function(expensesPeriod: Expense[]): number {
        const totalExpensesSum: number = expensesPeriod.reduce(
            function(total, expense) {
                return total + expense.sum;
            }, 
        0);

        return totalExpensesSum;
    },
};

/* Exports */

export default expensesStorage;

