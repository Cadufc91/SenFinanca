import React, { useState, useEffect } from 'react';
import { Item } from '../../types/item';
import styles from './TableArea.module.css';
import TableItem from '../TableItem/TableItem';

type Props = {
    list: Item[];
    onEdit: (editedItem: Item) => void;
    onDelete: (deletedItem: Item) => void;
}

type Category = {
    title: string;
    color: string;
    expense: boolean;
};

const TableArea = ({ list, onEdit, onDelete }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const categories: Record<string, Category> = {
        food: { title: 'Comida', color: '#ff0000', expense: true },
        rent: { title: 'Aluguel', color: '#00ff00', expense: true },
        salary: { title: 'Salário', color: '#0000ff', expense: false },
        bills: { title: 'Contas', color: '#ffff00', expense: true },
        entertainment: { title: 'Entretenimento', color: '#ff00ff', expense: true },
    };

    useEffect(() => {
        localStorage.setItem('transactionList', JSON.stringify(list));
    }, [list]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const filteredList = list.filter(item => {
        const categoryMatch = !selectedCategory || item.category === selectedCategory;
        const typeMatch = !selectedType || categories[item.category].expense === (selectedType === 'expense');
        return categoryMatch && typeMatch;
    });

    return (
        <div>
            <div className={styles.filters}>
                <div className={styles.categoryFilter}>
                    <label htmlFor="categoryFilter">Filtrar por Categoria: </label>
                    <select
                        id="categoryFilter"
                        value={selectedCategory || ''}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Todas</option>
                        {Object.keys(categories).map(categoryId => (
                            <option key={categoryId} value={categoryId}>
                                {categories[categoryId].title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.typeFilter}>
                    <label htmlFor="typeFilter">Filtrar por Tipo: </label>
                    <select
                        id="typeFilter"
                        value={selectedType || ''}
                        onChange={handleTypeChange}
                    >
                        <option value="">Todos</option>
                        <option value="income">Receitas</option>
                        <option value="expense">Despesas</option>
                    </select>
                </div>
            </div>
            <table className={styles.tableContainer}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th>Data</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody className={styles.tableContent}>
                    {filteredList.map((item, index) => (
                        <TableItem 
                            key={index} 
                            item={item}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableArea;
