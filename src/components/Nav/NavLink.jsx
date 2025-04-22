/**
 * Imports
 */

import { useSelector } from 'react-redux';

/**
 * NavLinkItem
 */

const NavLink = ({ link, displayPage, config }) => {
    const activeLink = useSelector((state) => state.page.currentPage);

    const handleClick = (event) => {
        event.preventDefault();
        displayPage(link);
    };

    const NavLinkStyleClasses = `
        flex flex-col items-center w-1/4 rounded-full
        hover:bg-gray-200 transition-colors duration-200 
        ${activeLink === link ? 'text-blue-600' : 'text-gray-600 '}   
    `;

    return (
        <a
            href="#"
            onClick={handleClick}
            className={NavLinkStyleClasses}
        >
            <i className={`bi ${config[link].iconClass} text-[2.5rem] -mb-1`}>
            </i>
            <span className="text-center md:hidden">
                {config[link].shortLabel}
            </span>
            <span className="text-center hidden md:block">
                {config[link].fullLabel}
            </span>
        </a>
    );
};

/**
 * Exports
 */

export default NavLink;