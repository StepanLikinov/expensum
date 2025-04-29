/**
 * Importrs
 */

import { formatDate } from "../lib/helpers";

/**
 * ExpenseCard
 */

const ExpenseCard = ({ expense, iconClass }) => {
    const expenseCardStyleClasses = 
        `border border-gray-300 rounded-lg shadow-sm m-4`;
    const expenseDateStyleClasses = `
        bg-gray-100 border border-b-gray-300 text-center 
        text-gray-600 font-semibold text-lg py-2 rounded-t-lg
    `;
    const expenseCategoryIconStyleClasses = 
        `text-3xl md:text-4xl mr-6`;
    const expenseCategoryStyleClasses = 
        `text-xl font-semibold`;
    const expenseComentIconStyleClasses = 
        `text-base text-gray-500 mt-1`;
    const expenseAmountIconStyleClasses = 
        `text-right text-xl font-semibold whitespace-nowrap ml-4`;
    
    return (
        <div className={expenseCardStyleClasses}>
            <div className={expenseDateStyleClasses}>
                {formatDate(expense.date)}
            </div>

            <div className="p-5">
                <div className="flex items-start">
                    <div className={expenseCategoryIconStyleClasses}>
                        <i className={iconClass}></i>
                    </div>
                    <div className="flex-1">
                        <div className={expenseCategoryStyleClasses}>
                            {expense.category}
                        </div>
                        <div className={expenseComentIconStyleClasses}>
                            Комментарий: {expense.comment}
                        </div>
                    </div>
                    <div className={expenseAmountIconStyleClasses}>
                        {expense.sum} ₽
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Exports
 */

export default ExpenseCard;