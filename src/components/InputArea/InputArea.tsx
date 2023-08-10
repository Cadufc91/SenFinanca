import React, { useState } from 'react';
import styles from './InputArea.module.css';
import { Item } from '../../types/item';
import { categories } from '../../data/categories';
import { newDateAdjusted } from '../../helpers/dateFilter';

type Props = {
    onAdd: (item: Item) => void;
}

function InputArea({ onAdd }: Props) {
    const [dateField, setDateField] = useState('');
    const [categoryField, setCategoryField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [valueField, setValueField] = useState<number>(0);

    let categoryKeys: string[] = Object.keys(categories);

    const handleAddEvent = () => {
        let errors: string[] = [];

        if(isNaN(new Date(dateField).getTime())) {
            errors.push('Data inválida!');
        }
        if(!categoryKeys.includes(categoryField)) {
            errors.push('Categoria inválida!');
        }
        if(descriptionField === '') {
            errors.push('Descrição vazia!');
        }
        if(valueField <= 0) {
            errors.push('Valor inválido!');
        }

        if(errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            const formattedValue = parseFloat(valueField.toFixed(2));
            onAdd({
                id: 0,
                date: newDateAdjusted(dateField),
                category: categoryField,
                description: descriptionField,
                value: formattedValue,
            });
            clearFields();
        }
    }

    const clearFields = () => {
        setDateField('');
        setCategoryField('');
        setDescriptionField('');
        setValueField(0);
    }

  return (
    <div className={styles.inputAreaContainer}>
        <div className={styles.itemContainer}>
            <label htmlFor="date">Data</label>
            <input 
                type="date"
                value={dateField}
                onChange={e => setDateField(e.target.value)}
             />
        </div>
        <div className={styles.itemContainer}>
            <label htmlFor="category">Categoria</label>
            <select 
                name="category" 
                id="category"
                value={categoryField}
                onChange={e => setCategoryField(e.target.value)}
            >
                <>
                    <option></option>
                    {categoryKeys.map((key, index) => (
                        <option key={index} value={key}>{categories[key].title}</option>
                    ))}
                </>
            </select>
        </div>
        <div className={styles.itemContainer}>
            <label htmlFor="description">Descrição</label>
            <input 
                type="text"
                value={descriptionField}
                onChange={e => setDescriptionField(e.target.value)}
            />
        </div>
        <div className={styles.itemContainer}>
            <label htmlFor="value">Valor</label>
            <input type="number" 
                value={valueField}
                onChange={e => setValueField(parseFloat(e.target.value))}
            />
        </div>
        <button className={styles.addButton} onClick={handleAddEvent}>Adicionar</button>
    </div>
  )
}

export default InputArea;