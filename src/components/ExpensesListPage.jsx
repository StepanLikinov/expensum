import React from 'react';

const ExpensesListPage = () => {
    return (
        <div className="max-w-[1320px] mx-auto" id="list">
            <input
                className="block mx-auto my-2 p-2 text-center border border-gray-300 rounded"
                type="month"
                id="calendar"
            />
            <div className="text-2xl text-center">Список расходов</div>
            <div id="expenses-container"></div>
        </div>
    );
};

export default ExpensesListPage;