import React, { useState } from 'react';
import navConfig from './configs/navConfig'; 
import Nav from './components/Nav'; 

const App = () => {
    const [currentPage, setCurrentPage] = useState('main');  // Хранение текущей страницы

    // Функция для изменения активной страницы
    const displayPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Nav 
                navLinks={navConfig.navLinks}  // Передаем ссылки для навигации
                displayPage={displayPage}  // Функция для изменения активной страницы
                config={navConfig}  // Передаем весь конфиг в Nav
            />
            <div className="p-4">
                {navConfig.pages[currentPage]} {/* Отображаем компонент текущей страницы */}
            </div>
        </div>
    );
};

export default App;