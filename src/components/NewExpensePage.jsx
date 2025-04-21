import React, { useRef }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../features/categoriesSlice';
import { setDate } from '../features/dateSlice';
import { setPage } from '../features/pageSlice';
import { addExpense } from '../features/expensesSlice'
import generateId from '../../lib/generateId';


const NewExpensePage = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.list); // Получаем список категорий
    const currentDate = useSelector((state) => state.date.currentDate); // Получаем текущую дату
    const selectedCategory = useSelector((state) => state.categories.selectedCategory); // Получаем выбранную категорию

    const sumRef = useRef(null);
    const commentRef = useRef(null);

    const handleDateChange = (event) => {
        dispatch(setDate(event.target.value)); // Обновляем дату в Redux
    };

    // При изменении значения в select, обновляем выбранную категорию в Redux
    const handleCategoryChange = (event) => {
        dispatch(selectCategory(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const sum = Number.parseFloat(sumRef.current.value);
        const comment = commentRef.current.value;

        const newExpense = {
            id: generateId(),
            date: currentDate,
            category: selectedCategory,
            sum,
            comment,
        };

        dispatch(addExpense(newExpense));
        dispatch(setPage('list'));
        
    };

    return (
        <div className="max-w-[1320px] mx-auto px-2" id="new">
            <form id="expense-form" onSubmit={handleSubmit}>
                <div className="text-2xl p-3 mb-2 text-center">Новый расход</div>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full px-2 md:w-1/2">
                        <input
                            className="w-full p-2 mb-2 border rounded"
                            type="date"
                            id="day"
                            value={currentDate}
                            onChange={handleDateChange}
                        />
                        <select
                            className="w-full p-2 mb-2 border rounded"
                            id="category-select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option disabled>Категория</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            className="w-full p-2 mb-2 border rounded"
                            id="sum"
                            type="number"
                            placeholder="Сумма"
                            ref={sumRef}
                        />
                    </div>
                    <div className="w-full px-2 md:w-1/2">
                        <textarea
                            className="w-full p-2 mb-2 border rounded"
                            id="comment"
                            placeholder="Комментарий"
                            ref={commentRef}
                        />
                    </div>
                </div>
                <div>
                    <button
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        type="submit"
                    >
                        Создать
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewExpensePage;