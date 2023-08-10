import React from 'react';
import styles from './InfoArea.module.css';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';
import ResumeItem from '../ResumeItem/ResumeItem';
import { formatCurrentMonth } from '../../helpers/dateFilter';

type Props = {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  income: number;
  expense: number;
}

const InfoArea = ({ currentMonth, onMonthChange, income, expense }: Props) => {
  const handlePrevMonth = () => {
    let [year, month] = currentMonth.split('-');
    let currentDate = new Date(parseInt(year), parseInt(month) -1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() +1}`);
  }

  const handleNextMonth = () => {
    let [year, month] = currentMonth.split('-');
    let currentDate = new Date(parseInt(year), parseInt(month) -1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() +1}`);
  }

  return (
    <div className={styles.infoAreaContainer}>
        <div className={styles.monthControl}>
            <button className={styles.controlButton} onClick={handlePrevMonth}>
              <HiArrowSmLeft />
            </button>
            <p className={styles.currentMonth}>{formatCurrentMonth(currentMonth)}</p>
            <button className={styles.controlButton} onClick={handleNextMonth}>
              <HiArrowSmRight />
            </button>
        </div>
        <div className={styles.balanceControl}>
            <ResumeItem title='Receitas' value={income}/>
            <ResumeItem title='Despesa' value={expense} />
            <ResumeItem
              title='Saldo'
              value={income - expense}
              color={(income - expense) < 0 ? 'red' : 'green'}
            />
        </div>
    </div>
  )
}

export default InfoArea;