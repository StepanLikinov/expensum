/**
 * Imports
 */

import { clearContainer, clearValue } from './heplers.js';
import datesDomApi from './datesDomApi.js';
import categoriesDomApi from './categoriesDomApi.js';
import categoriesStorage from './categoriesStorageApi.js';
import expensesStorage from './expensesStorageApi.js';

/**
 * Nodes
 */

const $expenseTemplate: HTMLTemplateElement | null = 
    document.getElementById('expense-template') as HTMLTemplateElement;
const $day = document.getElementById('day') as HTMLInputElement;
const $sum = document.getElementById('sum') as HTMLInputElement;
const $comment = document.getElementById('comment') as HTMLInputElement;
const $expensesContainer = 
    document.getElementById('expenses-container') as HTMLElement;
const $calendar = document.getElementById('calendar') as HTMLInputElement;

/**
 * Interfaces
 */

interface Expense {
    id: string;
    date: number;
    category: string;
    categoryId: number;
    sum: number;
    comment?: string; // Комментарий может быть необязательным
}

interface Category {
    id: number;
    name: string;
    iconClass: string;
}

interface FormData { 
    date: number, 
    selectedCategory: string | null, 
    sum: string, 
    comment?: string 
}

interface ExpensesDomApi {
    create(expense: Expense): HTMLElement;
    renderList(data: Expense[]): void;
    renderSelectedMonthList(): void;
    showTotal(expensesPeriod: Expense[], $target: HTMLElement): void;
    resetForm(): void;
    getFormData(): FormData;
}

/**
 * DOM API
 */

const expensesDomApi: ExpensesDomApi = {
    // Cоздание элемента расхода
    create: function(expense: Expense): HTMLElement {
        const category: Category | undefined = 
            categoriesStorage.find(expense.category);
        const iconClass = category ? category.iconClass : '';

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
    },

    // Рендеринг списка расходов
    renderList: function(data: Expense[]): void {
        clearContainer($expensesContainer);

        data.forEach((expense: Expense) => {
            const $expense: HTMLElement = this.create(expense);
            $expensesContainer.appendChild($expense);
        });
    },

    // Рендеринг списка расходов выбраннго месяца
    renderSelectedMonthList: function(): void {
        const selectedMonth: number = 
            Number.parseInt($calendar.value.split('-')[1]) - 1;
        const selectedMonthExpenses: Expense[] = 
            expensesStorage.getByMonth(selectedMonth);
        this.renderList(selectedMonthExpenses);
    },

    // Отображение суммы расходов за месяц
    showTotal: function(expensesPeriod: Expense[], $target: HTMLElement): void {
        const totalExpenses: number = 
            expensesStorage.calculateTotal(expensesPeriod);
        $target.innerText = `${totalExpenses} ₽`;
    },

    // "Очистка" формы
    resetForm: function(): void {
        clearValue($sum);
        clearValue($comment);
    },

    // Получение данных из формы
    getFormData: function ():FormData {
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
    }
}


/* Exports */

export default expensesDomApi;

