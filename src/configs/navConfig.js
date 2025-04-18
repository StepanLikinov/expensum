import React from 'react';
import MainPage from '../components/MainPage';
import NewExpensePage from '../components/NewExpensePage';
import ExpensesListPage from '../components/ExpensesListPage';

const navConfig = {
    navLinks: ["main", "new", "list"],
    pages: {
        main: <MainPage />,
        new: <NewExpensePage />,
        list: <ExpensesListPage />
    },
    main: {
        iconClass: "bi-house",
        shortLabel: "Главная",
        fullLabel: "Главная",
        active: false,
    },
    new: {
        iconClass: "bi-plus-circle",
        shortLabel: "Новый",
        fullLabel: "Новый расход",
        active: false,
    },
    list: {
        iconClass: "bi-list-ul",
        shortLabel: "Список",
        fullLabel: "Список расходов",
        active: false,
    },
};

export default navConfig;