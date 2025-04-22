/**
 * SummaryBlock
 */

const SummaryBlock = ({ total, monthName }) => {
    return (
        <div className="w-full mb-2 bg-gray-100 pb-1">
            <div className="text-center">
                <div className="pt-1 text-md text-gray-500">
                    Итого расходов
                </div>
                <div className="text-2xl" id="total-expenses">
                    {total} ₽
                </div>
            </div>
            <div className="text-3xl text-center" id="current-month">
                {monthName}
            </div>
        </div>
    );
};

/**
 * Exports
 */

export default SummaryBlock;