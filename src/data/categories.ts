import { Category } from "../types/category";

export const categories: Category = {
    food: { title: 'Alimentação', color: 'red', expense: true },
    rent: { title: 'Aluguel', color: 'blue', expense: true },
    salary: { title: 'Salário', color: 'green', expense: false },
    bills: { title: 'Contas', color: 'purple', expense: true },
    entertainment: { title: 'Entretenimento', color: 'orange', expense: true },
}