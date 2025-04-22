import React from 'react';
import NavLinkItem from './NavLinkItem';

const Nav = ({ navLinks, displayPage, config }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 py-2">
            <div className="w-full px-4">
                <div className="flex justify-around w-full">
                    {navLinks.map((link) => (
                        <NavLinkItem
                            key={link}
                            link={link}
                            displayPage={displayPage}
                            config={config}
                        />
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Nav;