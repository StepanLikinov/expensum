/**
 * Imports
 */

import { Expense, ExpensesStorage } from './interfaces';
import generateId from './generateId.js';
import datesDomApi from './datesDomApi.js';
import categoriesStorage from './categoriesStorageApi.js';

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
        date: number, 
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
    getByMonth: function(this: ExpensesStorage, month: number): Expense[] {
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
        const currentMonthIndex: number = datesDomApi.current.getMonth();
        const currentMonthExpenses: Expense[] = 
            this.getByMonth(currentMonthIndex);

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

