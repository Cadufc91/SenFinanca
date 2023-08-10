import React from 'react';
import { Item } from '../../types/item';
import styles from './TableArea.module.css';
import TableItem from '../TableItem/TableItem';

type Props = {
    list: Item[];
    onEdit: (editedItem: Item) => void;
    onDelete: (deletedItem: Item) => void;
}

const TableArea = ({ list, onEdit, onDelete }: Props) => {
  return (
    <div>
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
                {list.map((item, index) => (
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
  )
}

export default TableArea;