```js
createExpense: function (selectedCategory, $sum, $comment) {
    return {
        id: generateId(),
        category: selectedCategory,
        sum: $sum.innerText,
        comment: $comment.innerText,
        date: Date.now() // Хранение даты в формате timestamp
    };
}
```

```js
const expense = 
    categoriesStorage.createExpense(selectedCategory, $sum, $comment);
```

Название параметров и аргументов совпадают полностью. Думаю это не есть хорошо, но с другой стороны они отлично передают смысл.
Нормально так делать?