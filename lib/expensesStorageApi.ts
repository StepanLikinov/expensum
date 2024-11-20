/**
 * Imports
 */

import { Expense, ExpensesStorage, Category } from './interfaces';
import generateId from './generateId.js';
import datesDomApi from './datesDomApi.js';
import categoriesStorage from './categoriesStorageApi.js';

/**
 * Storage
 */

const expensesStorage: ExpensesStorage = {
    getAll: function() {
        let result: Expense[];
        const expensesJson: string | null = localStorage.getItem('expenses');

        if (expensesJson) {
            result = JSON.parse(expensesJson);
        } else {
            result = [];
        }

        return result;
    },

    saveAll: function(expenses) {
        const serializedExpenses: string = JSON.stringify(expenses);
        localStorage.setItem('expenses', serializedExpenses);
    },

    add: function(expense) {
        const expenses: Expense[] = this.getAll();
        expenses.push(expense);
        this.saveAll(expenses);
    },

    create: function(date, selectedCategory, sum, comment?) {
        const category: Category | undefined = 
            categoriesStorage.find(selectedCategory);

        if (category === undefined) {
            throw new Error(`Category ${selectedCategory} not found`);
        }
        
        const categoryId = category.id;

        return {
            id: generateId(),
            date: date,
            category: selectedCategory,
            categoryId: categoryId,
            sum: Number.parseFloat(sum),
            comment: comment
        }
    },

    // Получение расходов по выбранному месяцу
    getByMonth: function(month) {
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
    getCurrentMonth: function() {
        const currentMonthIndex: number = datesDomApi.current.getMonth();

        const currentMonthExpenses: Expense[] = 
            this.getByMonth(currentMonthIndex);

        return currentMonthExpenses;
    },

    // Расчет суммы расходов за период
    calculateTotal: function(expensesPeriod) {
        const totalExpensesSum: number = expensesPeriod.reduce(
            function(total: number, expense: Expense) {
                return total + expense.sum;
            }, 
        0);

        return totalExpensesSum;
    },
};

/* Exports */

export default expensesStorage;

