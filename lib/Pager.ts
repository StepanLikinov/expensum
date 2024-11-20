/**
 * Imports
 */

import { Page } from "./interfaces";

/**
 * Pager
 */

export default class Pager {
    pages: { [key: string]: Page };
    displayValue: string;

    constructor(
        pages: { [key: string]: Page },
        startPage: string,
        displayValue: string = 'block'
    ) {
        this.pages = pages;
        this.showPage(startPage);
        this.addEventListeners();
        this.displayValue = displayValue;
    }
  
    showPage(inputPageName: string): void {
        for (let pageName in this.pages) {
            const page = this.pages[pageName];

            if (pageName === inputPageName && page.pageElement) {
                page.pageElement.style.display = this.displayValue;
            } else if (page.pageElement) {
                page.pageElement.style.display = 'none';
            }
        }
    }
  
    addEventListeners(): void {
        for (let pageName in this.pages) {
            const page = this.pages[pageName];
            
            if (page.linkToPage){
                page.linkToPage.addEventListener(
                    'click', 
                    (event: MouseEvent) => {
                        event.preventDefault();
                        this.showPage(pageName);
                    }
                );
            }
        }
    }
}
