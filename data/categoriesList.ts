interface Category {
    id: number;
    name: string;
    iconClass: string;
}

/**
 * Data
 */

const categoriesList: Category[] = [
    { id: 1, name: "Продукты", iconClass: "bi bi-cart3" },
    { id: 2, name: "Дом", iconClass: "bi bi-house-door" },
    { id: 3, name: "Одежда", iconClass: "bi bi-handbag" },
    { id: 4, name: "Здоровье", iconClass: "bi bi-capsule" },
    { id: 5, name: "Спорт", iconClass: "bi bi-bicycle" },
    { id: 6, name: "Кафе", iconClass: "fa fa-cutlery" },
    { id: 7, name: "Отдых", iconClass: "bi bi-luggage" },
    { id: 8, name: "Авто", iconClass: "bi bi-car-front" },
    { id: 9, name: "Развлечения", iconClass: "bi bi-joystick" },
    { id: 10, name: "Обучение", iconClass: "bi bi-book" },
    { id: 11, name: "% по кредитам", iconClass: "bi bi-percent" },
    { id: 12, name: "Другое", iconClass: "bi bi-card-list" }
];

/**
 * Exports
 */

export { categoriesList };