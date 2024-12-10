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

interface CategoriesStorage {
    selected: string | null;
    setSelected(category: string): void;
    getSelected(): string | null;
    getAll: () => Category[];
    saveAll: (categories: Category[]) => void;
    find: (selectedCategory: string) => Category | undefined;
}

interface Expense {
    id: string;
    date: number;
    category: string;
    categoryId: number;
    sum: number;
    comment?: string;
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

/**
 * Exports
 */

export { 
    Page, Category, CategoriesStorage, Expense,
    FormData, ExpensesStorage, NavDomApi, ExpensesDomApi
}