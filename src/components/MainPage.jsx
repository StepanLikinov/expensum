import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectCategory } from '../features/categoriesSlice';
import { setPage } from '../features/pageSlice';
import { months } from '../../data/monthsList';

const MainPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.list); // Получаем список категорий из состояния
    const selectedCategory = useSelector((state) => state.categories.selectedCategory); // Получаем выбранную категорию
    const expenses = useSelector((state) => state.expenses.list);
    const currentDate = useSelector((state) => state.date.currentDate);

    // Проверяем, если категория не выбрана, то выбираем первую категорию
    if (!selectedCategory && categories.length > 0) {
        dispatch(selectCategory(categories[0].name)); // Устанавливаем первую категорию по умолчанию
    }

    const handleCategoryClick = (category) => {
        dispatch(selectCategory(category.name)); // Меняем выбранную категорию
        dispatch(setPage('new')); // Переключаем на страницу добавления нового расхода
    };

    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const filteredExpenses = expenses.filter(expense => expense.date.startsWith(currentMonth));
    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.sum, 0);
    const monthName = months[now.getMonth()];

    return (
        <div id="main">
            <div className="w-full mb-2 bg-gray-100 pb-1">
                <div className="text-center">
                    <div className="pt-1 text-md text-gray-500">Итого расходов</div>
                    <div className="text-2xl" id="total-expenses">{totalExpenses} ₽</div>
                </div>
                <div className="text-3xl text-center" id="current-month">{monthName}</div>
            </div>

            <div className="max-w-[1320px] mx-auto flex flex-wrap justify-evenly items-start px-4" id="categories-container">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="category flex flex-col items-center m-1 cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <span className="category-name w-24 h-8 mb-4 text-gray-500 text-center leading-none flex items-center justify-center" lang="ru">
                            {category.name}
                        </span>
                        <div className="category-icon w-20 h-20 border border-black rounded-full p-5 flex items-center justify-center text-4xl">
                            <i className={category.iconClass} ></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;