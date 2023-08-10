import React from 'react';
import styles from './ResumeItem.module.css';

type Props = {
    title: string;
    value: number;
    color?: string;
}

const ResumeItem = ({ title, value, color}: Props) => {
  return (
    <div className={styles.itemContainer}>
        <h4>{title}</h4>
        <p color={color}>R$ {value}</p>
    </div>
  )
}

export default ResumeItem