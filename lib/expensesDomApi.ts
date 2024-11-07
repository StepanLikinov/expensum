/**
 * Imports
 */

import { Expense, Category, FormData, ExpensesDomApi } from './interfaces';
import { clearContainer, clearValue } from './heplers.js';
import datesDomApi from './datesDomApi.js';
import categoriesDomApi from './categoriesDomApi.js';
import categoriesStorage from './categoriesStorageApi.js';
import expensesStorage from './expensesStorageApi.js';

/**
 * Nodes
 */

const $expenseTemplate: HTMLElement | null = 
    document.getElementById('expense-template');
const $day: HTMLElement | null = document.getElementById('day');
const $sum: HTMLElement | null = document.getElementById('sum');
const $comment: HTMLElement | null = document.getElementById('comment');
const $expensesContainer: HTMLElement | null = 
    document.getElementById('expenses-container');
const $calendar: HTMLElement | null = document.getElementById('calendar');

/**
 * DOM API
 */

const expensesDomApi: ExpensesDomApi = {
    // Cоздание элемента расхода
    create: function(expense: Expense): HTMLElement {
        const category: Category | undefined = 
            categoriesStorage.find(expense.category);
        const iconClass = category ? category.iconClass : '';

        if ($expenseTemplate instanceof HTMLTemplateElement) {
            const $expense: HTMLElement = 
            ($expenseTemplate.content.cloneNode(true) as DocumentFragment).
            querySelector('.expense') as HTMLElement;

            const $expenseDate: HTMLElement | null = 
                $expense.querySelector('.expense-date');
            const $expenseCategory: HTMLElement | null = 
                $expense.querySelector('.expense-category');
            const $expenseIcon: HTMLElement | null | undefined = 
                $expense.querySelector('.expense-category-icon')?.
                querySelector('i');
            const $expenseAmount: HTMLElement | null = 
                $expense.querySelector('.expense-amount');
            const $expenseComment: HTMLElement | null = 
                $expense.querySelector('.expense-comment');

            if ($expenseDate) {
                $expenseDate.innerText = datesDomApi.create(expense.date);
            }
            if ($expenseCategory) {
                $expenseCategory.innerText = expense.category;
            }
            if ($expenseIcon) {
                $expenseIcon.className = iconClass;
            }
            if ($expenseAmount) {
                $expenseAmount.innerText = `${expense.sum} ₽`;
            }
            if ($expenseComment) {
                $expenseComment.innerText = `Комментарий: ${expense.comment}`;
            }

            return $expense;
        } else {
            throw new Error(
                'Template for expense element not found in the DOM'
            );
        }

    },

    // Рендеринг списка расходов
    renderList: function(data: Expense[]): void {
        if ($expensesContainer){
            clearContainer($expensesContainer);

            data.forEach((expense: Expense) => {
                const $expense: HTMLElement = this.create(expense);
                $expensesContainer.appendChild($expense);
            });
        }
    },

    // Рендеринг списка расходов выбраннго месяца
    renderSelectedMonthList: function(): void {
        if ($calendar instanceof HTMLInputElement) {
            const selectedMonth: number = 
            Number.parseInt($calendar.value.split('-')[1]) - 1;
            const selectedMonthExpenses: Expense[] = 
                expensesStorage.getByMonth(selectedMonth);
            this.renderList(selectedMonthExpenses);
        }
    },

    // Отображение суммы расходов за месяц
    showTotal: function(expensesPeriod: Expense[], $target: HTMLElement): void {
        const totalExpenses: number = 
            expensesStorage.calculateTotal(expensesPeriod);
        $target.innerText = `${totalExpenses} ₽`;
    },

    // "Очистка" формы
    resetForm: function(): void {
        if ($sum instanceof HTMLInputElement) {
            clearValue($sum);
        }
        if ($comment instanceof HTMLInputElement) {
            clearValue($comment);
        }
    },

    // Получение данных из формы
    getFormData: function ():FormData {
        if ($day instanceof HTMLInputElement 
            && $sum instanceof HTMLInputElement
            && $comment instanceof HTMLInputElement
        ) {
            const date = new Date($day.value).getTime();
            const selectedCategory = categoriesDomApi.getSelected();
            const sum = $sum.value;
            const comment = $comment.value;
    
            return {
                date,
                selectedCategory,
                sum,
                comment
            }
        } else {
            throw new Error('Data in form not found in the DOM');
        }
    }
}


/* Exports */

export default expensesDomApi;

