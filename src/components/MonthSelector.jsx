import React from 'react';

const styleClasses = 
    `block mx-auto my-2 p-2 text-center border border-gray-300 rounded`;

const MonthSelector = ({ value, handleChange }) => {
    return (
        <input
            className={styleClasses}
            type="month"
            id="calendar"
            value={value}
            onChange={handleChange}
        />
    );
};

export default MonthSelector;