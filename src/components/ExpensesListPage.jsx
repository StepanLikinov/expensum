import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../features/dateSlice';
import MonthSelector from './MonthSelector';
import ExpenseCard from './ExpenseCard';


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
            <MonthSelector value={defaultMonth} handleChange={handleDateChange} />
            <div className="text-2xl text-center">Список расходов</div>

            <div id="expenses-container">
                {filteredExpenses.map((expense, index) => (
                    <ExpenseCard
                        key={index}
                        expense={expense}
                        iconClass={getCategoryIcon(expense.category)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpensesListPage;
