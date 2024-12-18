/**
 * Imports
 */

import { Expense, Category, FormData } from './interfaces';
import { clearContainer, formatDate } from './heplers';
import categoriesStorage from './categoriesStorageApi';
import expensesStorage from './expensesStorageApi';

/**
 * DOM API
 */

class ExpensesDomApi {
    $expenseTemplate: HTMLElement | null;
    $expensesContainer: HTMLElement | null;
    $day: HTMLElement | null;
    $sum: HTMLElement | null;
    $comment: HTMLElement | null;   
    $calendar: HTMLElement | null; 
    $totalExpenses: HTMLElement | null; 

    constructor(    
        $expenseTemplate: HTMLElement | null,
        $expensesContainer: HTMLElement | null,
        $day: HTMLElement | null,
        $sum: HTMLElement | null,
        $comment: HTMLElement | null,   
        $calendar: HTMLElement | null, 
        $totalExpenses: HTMLElement | null
    ) {
        this.$expenseTemplate = $expenseTemplate
        this.$expensesContainer = $expensesContainer
        this.$day = $day
        this.$sum = $sum
        this.$comment = $comment
        this.$calendar = $calendar
        this.$totalExpenses = $totalExpenses
    }

    // Cоздание элемента расхода
    create(expense: Expense): HTMLElement  {
        const category: Category | undefined = 
            categoriesStorage.find(expense.category);

        const iconClass: string = category ? category.iconClass : '';
    
        if (!(this.$expenseTemplate instanceof HTMLTemplateElement)) {
            throw new Error(
                'Template for expense element not found in the DOM'
            );
        }
    
        const $expenseTemplateClone: DocumentFragment = 
            this.$expenseTemplate.content.cloneNode(true) as DocumentFragment;

        const $expense: HTMLElement | null = 
            $expenseTemplateClone.querySelector(".expense");
    
        if (!$expense) {
            throw new Error("Couldn't find .expense element in template clone");
        }
    
        const $expenseDate: HTMLElement | null = 
            $expense.querySelector('.expense-date');

        const $expenseCategory: HTMLElement | null = 
            $expense.querySelector('.expense-category');

        const $expenseIcon: HTMLElement | null = 
            $expense.querySelector('.expense-category-icon i');

        const $expenseAmount: HTMLElement | null = 
            $expense.querySelector('.expense-amount');

        const $expenseComment: HTMLElement | null = 
            $expense.querySelector('.expense-comment');
    
        if ($expenseDate) {
            $expenseDate.innerText = formatDate(expense.date);
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
    }

    // Рендеринг списка расходов
    renderList(data: Expense[]): void {
        if (this.$expensesContainer){
            clearContainer(this.$expensesContainer);

            data.forEach((expense: Expense) => {
                const $expense: HTMLElement = this.create(expense);
                this.$expensesContainer.appendChild($expense);
            });
        }
    }

    // Рендеринг списка расходов выбраннго месяца
    renderSelectedMonthList(): void {
        if (this.$calendar instanceof HTMLInputElement) {
            const selectedMonth: number = 
            Number.parseInt(this.$calendar.value.split('-')[1]) - 1;
            const selectedMonthExpenses: Expense[] = 
                expensesStorage.getByMonth(selectedMonth);
            this.renderList(selectedMonthExpenses);
        }
    }

    // Отображение суммы расходов за месяц
    showTotal(expensesPeriod: Expense[]): void {
        const totalExpenses: number = 
            expensesStorage.calculateTotal(expensesPeriod);
        if (this.$totalExpenses) {
            this.$totalExpenses.innerText = `${totalExpenses} ₽`;
        }
    }

    // Получение данных из формы
    getFormData(): FormData {
        if (
            !(
                this.$day instanceof HTMLInputElement &&
                this.$sum instanceof HTMLInputElement &&
                this.$comment instanceof HTMLTextAreaElement
            )
        ) {
                throw new Error('Data in form not found in the DOM');
            }

        const date: number = new Date(this.$day.value).getTime();

        const selectedCategory: string | null = 
            categoriesStorage.getSelected();

        const sum: string = this.$sum.value;
        const comment: string = this.$comment.value;

        return {
            date,
            selectedCategory,
            sum,
            comment
        }
    }

    calendarChangeHandle(): void {
        if (this.$calendar instanceof HTMLInputElement) {
            this.$calendar.addEventListener('change', () => {
                this.renderSelectedMonthList();
            });
        }
    }
}

/* Exports */

export default ExpensesDomApi;