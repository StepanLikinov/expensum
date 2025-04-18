import React from 'react';

const NewExpensePage = () => {
    return (
        <div className="max-w-[1320px] mx-auto px-2" id="new">
            <form id="expense-form">
                <div className="text-2xl p-3 mb-2 text-center">Новый расход</div>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full px-2 md:w-1/2">
                        <input
                            className="w-full p-2 mb-2 border rounded"
                            type="date"
                            id="day"
                        />
                        <select
                            className="w-full p-2 mb-2 border rounded"
                            id="category-select"
                        >
                            <option>Категория</option>
                        </select>
                        <input
                            className="w-full p-2 mb-2 border rounded"
                            id="sum"
                            type="number"
                            placeholder="Сумма"
                        />
                    </div>
                    <div className="w-full px-2 md:w-1/2">
                        <textarea
                            className="w-full p-2 mb-2 border rounded"
                            id="comment"
                            placeholder="Комментарий"
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