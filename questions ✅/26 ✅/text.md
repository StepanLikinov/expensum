Для использовани бутстрапа и правильной стилизации элементов навигации (активный) пришлось изменить `Pager`.
Насколько это логично?

```js
    showPage(inputPageName) {
        for (let pageName in this.pages) {
            if (pageName === inputPageName) {
                this.pages[pageName].pageElement.style.display 
                    = this.displayValue;
                // добавить класс active
                this.pages[pageName].linkToPage.classList.add('active'); 
            } else {
                this.pages[pageName].pageElement.style.display = 'none';
                // удалить класс active
                this.pages[pageName].linkToPage.classList.remove('active'); 
            }
        }
    }
```

В целом если бутстрап использоваться не будет, ничего страшного не случится, но появится лишний класс у активного элемента.
Можно ли оставить так или нужен другой подход?