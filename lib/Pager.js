export default class Pager {
    constructor(pages, startPage, displayValue = 'block') {
        this.pages = pages;
        this.showPage(startPage);
        this.addEventListeners();
        this.displayValue = displayValue;
    }
  
    showPage(inputPageName) {
        for (let pageName in this.pages) {
            if (pageName === inputPageName) {
                this.pages[pageName].pageElement.style.display 
                    = this.displayValue;
            } else {
                this.pages[pageName].pageElement.style.display = 'none';
            }
        }
    }
  
    addEventListeners() {
        for (let pageName in this.pages) {
            this.pages[pageName].linkToPage.addEventListener(
                'click', 
                (event) => {
                    event.preventDefault();
                    this.showPage(pageName);
                }
            );
        }
    }
}
