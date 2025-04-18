import React from 'react';

const MainPage = () => {
    return (
        <div id="main">
            <div className="w-full mb-2 bg-gray-100 pb-1">
                <div className="text-center">
                    <div className="pt-1 text-md text-gray-500">Итого расходов</div>
                    <div className="text-2xl" id="total-expenses"></div>   
                </div>
                <div className="text-3xl text-center" id="current-month"></div>
            </div>  
            <div className="max-w-[1320px] mx-auto flex flex-wrap justify-evenly items-start" id="categories-container"></div>
        </div>
    );
};

export default MainPage;