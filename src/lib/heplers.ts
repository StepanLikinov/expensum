/**
 * Functions
 */

const clearContainer = ($сontainer: HTMLElement): void => {
    $сontainer.innerHTML = '';
};

const clearValue = ($element: HTMLInputElement | HTMLTextAreaElement): void => {
    $element.value = '';
};

const formatDate = (timestamp: number): string => {
    const dateObject: Date = new Date(timestamp);
    const day: number = dateObject.getDate();
    const month: number = dateObject.getMonth() + 1;

    const formattedDate: string = 
        `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;

    return formattedDate;
}

/**
 * Exports
 */

export { clearContainer, clearValue, formatDate };