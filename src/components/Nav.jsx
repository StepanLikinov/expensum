import React, { useState } from 'react';
import navConfig from '../configs/navConfig';
import { useSelector } from 'react-redux';

const Nav = ({ navLinks, displayPage, config }) => {
    const activeLink = useSelector((state) => state.page.currentPage);

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 py-2">
            <div className="w-full px-4">
                <div className="flex justify-around w-full">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                displayPage(link);
                            }}
                            className={`flex flex-col items-center w-1/4 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200 ${activeLink === link ? 'text-blue-500' : ''}`}
                        >
                            <i className={`bi ${config[link].iconClass} text-[2.5rem] -mb-1`}></i>
                            <span className="text-center md:hidden">{config[link].shortLabel}</span>
                            <span className="text-center hidden md:block">{config[link].fullLabel}</span>
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Nav;