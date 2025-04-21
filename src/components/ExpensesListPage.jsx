import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../features/dateSlice';

const ExpensesListPage = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.list);
    const categories = useSelector((state) => state.categories.list);
    const currentDate = useSelector((state) => state.date.currentDate);
    const defaultMonth = currentDate.slice(0, 7);

    const handleDateChange = (event) => {
        dispatch(setDate(event.target.value + '-01'));
    };

    const getCategoryIcon = (categoryName) => {
        const category = 
            categories.find(category => category.name === categoryName);
        return category.iconClass;
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
        });
    };

    const currentMonth = currentDate.slice(0, 7);
    const filteredExpenses = expenses.filter(expence => expence.date.startsWith(currentMonth));

    return (
        <div className="max-w-[1320px] mx-auto" id="list">
            <input
                className="block mx-auto my-2 p-2 text-center border border-gray-300 rounded"
                type="month"
                id="calendar"
                value={defaultMonth}
                onChange={handleDateChange}
            />
            <div className="text-2xl text-center">Список расходов</div>

            <div id="expenses-container">
                {filteredExpenses.map((expense, index) => (
                    <div
                        key={index}
                        className="expense border border-gray-300 rounded-lg shadow-sm m-4"
                    >
                        <div className="expense-date bg-gray-100 border border-b-gray-300 text-center text-gray-600 font-semibold text-lg py-2 rounded-t-lg">
                            {formatDate(expense.date)}
                        </div>

                        <div className="p-5">
                            <div className="flex items-start">
                                <div className="expense-category-icon text-3xl md:text-4xl mr-6">
                                    <i className={getCategoryIcon(expense.category)}></i>
                                </div>

                                <div className="flex-1">
                                    <div className="expense-category text-xl font-semibold">
                                        {expense.category}
                                    </div>
                                    <div className="expense-comment text-base text-gray-500 mt-1">
                                        Комментарий: {expense.comment}
                                    </div>
                                </div>

                                <div className="expense-amount text-right text-xl font-semibold whitespace-nowrap ml-4">
                                    {expense.sum} ₽
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpensesListPage;
