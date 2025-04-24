/**
 * Imports
 */

import { useDispatch, useSelector } from 'react-redux'
import { selectCategory } from '../../features/categoriesSlice';
import { setPage } from '../../features/pageSlice';
import { months } from '../../data/monthsList';
import SummaryBlock from './SummaryBlock';
import CategoryCard from './CategoryCard';

/**
 * MainPage
 */

const MainPage = () => {
    const dispatch = useDispatch();
    const categories = 
        useSelector((state) => state.categories.list); 
    const selectedCategory = 
        useSelector((state) => state.categories.selectedCategory); 
    const expenses = 
        useSelector((state) => state.expenses.list);
    const currentDate = 
        useSelector((state) => state.date.currentDate);
    const categoryContainerStyleClasses =
        "max-w-[1320px] mx-auto flex flex-wrap justify-evenly items-start px-4"

    if (!selectedCategory) {
        dispatch(selectCategory(categories[0].name));
    }

    const handleCategoryClick = (category) => {
        dispatch(selectCategory(category.name));
        dispatch(setPage('new'));
    };

    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const filteredExpenses = 
        expenses.filter(expense => expense.date.startsWith(currentMonth));
    const totalExpenses = 
        filteredExpenses.reduce((sum, expense) => sum + expense.sum, 0);
    const monthName = months[now.getMonth()];

    return (
        <div>
            <SummaryBlock total={totalExpenses} monthName={monthName} />

            <div className={categoryContainerStyleClasses}>
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        handleClick={handleCategoryClick}
                    />
                ))}
            </div>
        </div>
    );
};

/**
 * Exports
 */

export default MainPage;