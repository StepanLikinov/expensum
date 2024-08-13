Мне кажется что замудрил с отображением даты в списке расходов.

```js
    // Создание элемента даты
    create: function(timestamp) {
        const $date = 
        $dateTemplate.content.cloneNode(true).querySelector('.date');
        // преобразование даты в читабельный формат
        const dateObject = new Date(timestamp);
        const day  = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const formattedDate = 
            `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;
        $date.innerText = formattedDate;

        return $date;
    },
```

Можно проще было обрезать лишние символы после преобразования?
```js
$date.innerText = dateObject.toLocaleString();
```

Но наверное мой подход более правильный
