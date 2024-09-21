Есть ли смысл разделять эту функцию?
На какие компоненты?

```js
// Добавление обработчиков событий для категорий
const addCategoryEventListeners = () => {
    const $categories = document.querySelectorAll('.category');
    
    $categories.forEach($category => {
        $category.addEventListener('click', () => {
            selectedCategory = $category.innerText;
            $selectedCategory.innerText = selectedCategory;
            pager.showPage('formOfCreatingExpense');
        });
    });
};
```

Из идей:

Разделить 
    - добавление обработчика на 1 элемент 
    - добавление на все элементы

но в таком случае, куда вставить:
```js
const $categories = document.querySelectorAll('.category');
```
