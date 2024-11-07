/**
 * Interfaces
 */

interface Page {
    pageElement: HTMLElement | null;
    linkToPage: HTMLElement | null;
}

interface Category {
    id: number;
    name: string;
    iconClass: string;
}

interface CategoriesDomApi {
    selected: string | null;
    setSelected(category: string): void;
    getSelected(): string | null;
    setDefaultInForm(): void;
    create(category: Category): HTMLElement;
    fillContainer($categoriesContainer: HTMLElement): void;
    fillSelect($categorySelect: HTMLSelectElement): void;
}

interface CategoriesStorage {
    getAll: () => Category[];
    saveAll: (categories: Category[]) => void;
    find: (selectedCategory: string) => Category | undefined;
}

interface DatesDomApi {
    current: Date;
    create: (timestamp: number) => string;
    showCurrentMonth: (target: HTMLElement) => void;
    setDayValue: () => void;
    setCalendarValue: () => void;
}

interface Expense {
    id: string;
    date: number;
    category: string;
    categoryId: number;
    sum: number;
    comment?: string; // Комментарий может быть необязательным
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

interface NavDomApi {
    setActive: ($clickedLink: HTMLAnchorElement) => void;
    initIndication: () => void;
}


export { 
    Page, Category, CategoriesDomApi, CategoriesStorage, DatesDomApi, Expense,
    FormData, ExpensesDomApi, ExpensesStorage, NavDomApi
}