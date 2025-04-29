/**
 * Imports
 */

import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../features/dateSlice';
import MonthSelector from '../components/MonthSelector';
import ExpenseCard from '../components/ExpenseCard';
import { getCategoryIcon, filterExpensesByMonth } from '../lib/helpers'

/**
 * ExpensesListPage
 */

const ExpensesListPage = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.list);
    const categories = useSelector((state) => state.categories.list);
    const currentDate = useSelector((state) => state.date.currentDate);
    const defaultMonth = currentDate.slice(0, 7);

    const handleDateChange = (event) => {
        dispatch(setDate(event.target.value + '-01'));
    };

    const currentMonth = currentDate.slice(0, 7);
    const filteredExpenses = filterExpensesByMonth(expenses, currentMonth);

    return (
        <div className="max-w-[1320px] mx-auto" id="list">
            <MonthSelector 
                value={defaultMonth} 
                handleChange={handleDateChange} 
            />
            
            <div className="text-2xl text-center">
                Список расходов
            </div>

            <div>
                {filteredExpenses.map((expense, index) => (
                    <ExpenseCard
                        key={index}
                        expense={expense}
                        iconClass=
                            {getCategoryIcon(expense.category, categories)}
                    />
                ))}
            </div>
        </div>
    );
};

/**
 * Exports
 */

export default ExpensesListPage;
