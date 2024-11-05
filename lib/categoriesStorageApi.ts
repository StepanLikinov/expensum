/**
 * Interfaces
 */

interface Category {
    id: number;
    name: string;
    iconClass: string;
}

interface CategoriesStorage {
    getAll: () => Category[];
    saveAll: (categories: Category[]) => void;
    find: (selectedCategory: string) => Category | undefined;
}

/**
 * Storage
 */

const categoriesStorage: CategoriesStorage = {
    getAll: function(): Category[] { 
        let result: Category[];
        
        const expenseCategoriesJson: string | null = 
            localStorage.getItem('expenseCategories');

        if (expenseCategoriesJson) {
            result = JSON.parse(expenseCategoriesJson); 
        } else {
            result = []; 
        }
    

        return result;
    },

    saveAll: function(categories: Category[]): void {
        const serializedCategories: string = JSON.stringify(categories);
        localStorage.setItem('expenseCategories', serializedCategories);
    },

    find: function(selectedCategory: string): Category | undefined {
        const categoriesList: Category[] = this.getAll();
        let result: Category | undefined = categoriesList.find(
            category => category.name === selectedCategory
        );

        return result;
    }
};

/**
 * Exports
 */

export default categoriesStorage;