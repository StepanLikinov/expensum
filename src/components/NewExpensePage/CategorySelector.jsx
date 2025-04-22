/**
 * CategorySelector
 */

const CategorySelector = ({ categories, selectedCategory, handleCategoryChange }) => {
    return (
        <select
            className="w-full p-2 mb-2 border rounded"
            value={selectedCategory}
            onChange={handleCategoryChange}
        >
            <option disabled>Категория</option>
            {categories.map((category) => (
                <option key={category.id} value={category.name}>
                    {category.name}
                </option>
            ))}
        </select>
    );
};

/**
 * Imports
 */

export default CategorySelector;