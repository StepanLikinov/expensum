/**
 * CommentInput
 */

const CommentInput = ({ value, handleChange }) => {
    return (
        <textarea
            className="w-full p-2 mb-2 border rounded"
            placeholder="Комментарий"
            value={value}
            onChange={handleChange}
        />
    );
};

/**
 * Exports
 */

export default CommentInput;