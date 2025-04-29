/**
 * Imports
 */

import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../features/categoriesSlice';
import { setDate } from '../features/dateSlice';
import { setPage } from '../features/pageSlice';
import { addExpense } from '../features/expensesSlice'
import generateId from '../lib/generateId';
import CategorySelector from '../components/CategorySelector';
import SumInput from '../components/SumInput';
import CommentInput from '../components/CommentInput';

/**
 * NewExpensePage
 */

const NewExpensePage = () => {
    const dispatch = useDispatch();
    const categories = 
        useSelector((state) => state.categories.list); 
    const currentDate = 
        useSelector((state) => state.date.currentDate); 
    const selectedCategory = 
        useSelector((state) => state.categories.selectedCategory);

    const [sum, setSum] = useState('');
    const [comment, setComment] = useState('');

    const buttonStyleClasses = 
        `w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600`

    const handleDateChange = (event) => {
        dispatch(setDate(event.target.value));
    };

    const handleCategoryChange = (event) => {
        dispatch(selectCategory(event.target.value));
    };

    const handleSumChange = (event) => {
        setSum(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newExpense = {
            id: generateId(),
            date: currentDate,
            category: selectedCategory,
            sum: Number.parseFloat(sum),
            comment,
        };

        dispatch(addExpense(newExpense));
        dispatch(setPage('list'));
    };

    return (
        <div className="max-w-[1320px] mx-auto px-2">
            <form onSubmit={handleSubmit}>
                <div className="text-2xl p-3 mb-2 text-center">
                    Новый расход
                </div>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full px-2 md:w-1/2">
                        <input
                            className="w-full p-2 mb-2 border rounded"
                            type="date"
                            value={currentDate}
                            onChange={handleDateChange}
                        />
                        <CategorySelector 
                            categories={categories}
                            selectedCategory={selectedCategory}
                            handleCategoryChange={handleCategoryChange}
                        />
                        <SumInput 
                            value={sum} 
                            handleChange={handleSumChange} 
                        />
                    </div>
                    <div className="w-full px-2 md:w-1/2">
                        <CommentInput 
                            value={comment} 
                            handleChange={handleCommentChange} 
                        />
                    </div>
                </div>
                <div>
                    <button className={buttonStyleClasses} type="submit">
                        Создать
                    </button>
                </div>
            </form>
        </div>
    );
};

/**
 * Exports
 */

export default NewExpensePage;