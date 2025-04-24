import MainPage from '../components/MainPage/MainPage';
import NewExpensePage from '../components/NewExpensePage/NewExpensePage';
import ExpensesListPage from '../components/ExpensesListPage/ExpensesListPage';

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

export default navConfig;