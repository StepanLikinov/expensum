/**
 * Imports
 */

import MainPage from '../pages/MainPage';
import NewExpensePage from '../pages/NewExpensePage';
import ExpensesListPage from '../pages/ExpensesListPage';

/**
 * Nav Config
 */

const navConfig = {
    navLinks: ["main", "new", "list"],
    pages: {
        main: <MainPage />,
        new: <NewExpensePage />,
        list: <ExpensesListPage />
    },
    main: {
        iconClass: "bi bi-house",
        shortLabel: "Главная",
        fullLabel: "Главная",
    },
    new: {
        iconClass: "bi bi-plus-circle",
        shortLabel: "Новый",
        fullLabel: "Новый расход",
    },
    list: {
        iconClass: "bi bi-list-ul",
        shortLabel: "Список",
        fullLabel: "Список расходов",
    },
};

/**
 * Exports
 */

export default navConfig;