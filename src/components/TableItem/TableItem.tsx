import React, { useState } from 'react';
import { Item } from '../../types/item';
import { formatDate } from '../../helpers/dateFilter';
import { categories } from '../../data/categories';
import styles from './TableItem.module.css';
import { FaPen, FaTrash } from 'react-icons/fa';

type Props = {
    item: Item
    onEdit: (editedItem: Item) => void;
    onDelete: (deletedItem: Item) => void;
}

const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const TableItem = ({ item, onEdit, onDelete }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(item);

    const handleEditItem = () => {
        setIsEditing(true);
    }

    const handleSaveItem = () => {
        onEdit(editedItem);
        setIsEditing(false);
    }

    const handleDeleteItem = () => {
        onDelete(item);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        if (name === "date") {
            setEditedItem((prevItem) => ({
                ...prevItem,
                date: new Date(value),
            }));
        } else {
            setEditedItem((prevItem) => ({
                ...prevItem,
                [name]: value,
            }));
        }
    };

  return (
    <div>
        <tr className={styles.tableItems}>
            <td>
                {isEditing ? (
                    <input
                        type="date"
                        name="date"
                        value={formatDateForInput(editedItem.date)}
                        onChange={handleInputChange}
                    />
                ) : (
                    formatDate(item.date)
                )}    
            </td>
            <td className='category' color={categories[item.category].color}>
                {isEditing ? (
                    <select name="category" value={editedItem.category} onChange={handleInputChange}>
                        {Object.keys(categories).map((categoryId) => (
                            <option key={categoryId} value={categoryId}>
                                {categories[categoryId].title}
                            </option>
                        ))}
                    </select>
                ) : (
                    categories[item.category].title
                )}
            </td>
            <td>
                {isEditing ? (
                    <input type="text" name="description" value={editedItem.description} onChange={handleInputChange} />
                ) : (
                    item.description
                )}
            </td>
            <td className='value' color={categories[item.category].expense ? 'red' : 'green'}>
                {isEditing ? (
                    <input type="number" name="value" value={editedItem.value} onChange={handleInputChange} />
                ) : (
                    `R$ ${item.value}`
                )}
            </td>
            <td>
                {isEditing ? (
                    <button className={styles.modifyButton} onClick={handleSaveItem}>
                        Salvar
                    </button>
                ) : (
                    <button className={styles.modifyButton} onClick={handleEditItem}>
                        <FaPen /> Editar
                    </button>
                )}
                <button className={styles.deleteButton} onClick={handleDeleteItem}>
                    <FaTrash /> Deletar
                </button>
            </td>
        </tr>
    </div>
  )
}

export default TableItem;