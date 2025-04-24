/**
 * MonthSelector
 */

const MonthSelector = ({ value, handleChange }) => {
    const styleClasses = 
        `block mx-auto my-2 p-2 text-center border border-gray-300 rounded`;
        
    return (
        <input
            className={styleClasses}
            type="month"
            value={value}
            onChange={handleChange}
        />
    );
};

/**
 * Exports
 */

export default MonthSelector;