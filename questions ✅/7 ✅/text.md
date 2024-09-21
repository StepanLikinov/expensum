Насколько глубоко стоит углубляться в расширение DOM API?

Например
```js
// Создание элемента категории
const createCategoryElement = (category) => {
    const $categoryDiv = document.createElement('div');
    $categoryDiv.innerText = category.name;
    $categoryDiv.classList.add('category');
    $categoryDiv.dataset.id = category.id;

    return $categoryDiv;
};
```

Можно сделать более гибкое, как `сreateElement`

На данном этапе не вижу в этом необходимости, а временни и усилий это потребует