/**
 * CategoryCard
 */

const CategoryCard = ({ category, handleClick }) => {

    const categoryCardStyleClasses = `
        category flex flex-col items-center m-1 cursor-pointer
    `;
    const categoryNameStyleClasses = `
        category-name w-24 h-8 mb-4 text-gray-500 text-center 
        leading-none flex items-center justify-center
    `;
    const categoryIconStyleClasses = `
        category-icon w-20 h-20 border border-black rounded-full p-5 
        flex items-center justify-center text-4xl
    `;

    return (
        <div
            className={categoryCardStyleClasses}
            onClick={() => handleClick(category)}
        >
            <span className={categoryNameStyleClasses} lang="ru">
                {category.name}
            </span>
            <div className={categoryIconStyleClasses}>
                <i className={category.iconClass}></i>
            </div>
        </div>
    );
};

/**
 * Exports
 */

export default CategoryCard;