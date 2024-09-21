
```js
handleSubmit: function() { 
    //...
    expensesDomApi.showTotal(
        expensesDomApi.getCurrentMonth(), 
        $totalExpenses
    );
}
```

`handleSubmit` лежит внутри `expensesDomApi` но в данном случае обращаться через `this` не получается
Не смог разобраться почему.

Возможно потому что мы вызываем `handleSubmit`  в обработчике события
Как выходить из таких ситуаций? Подходит ли мой вариант?

-----------------------------------

UPD:
Вопрос решился. Можно закрывать.
