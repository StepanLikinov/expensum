/**
 * SumInput
 */

const SumInput = ({ value, handleChange }) => {
    return (
        <input
            className="w-full p-2 mb-2 border rounded"
            type="number"
            placeholder="Сумма"
            value={value}
            onChange={handleChange}
        />
    );
};

/**
 * Exports
 */

export default SumInput;