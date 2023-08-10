import React, { useEffect, useState } from 'react';
import './App.css';
import InfoArea from './components/InfoArea/InfoArea';
import { Item } from './types/item';
import { items } from './data/items';
import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter';
import { categories } from './data/categories';
import InputArea from './components/InputArea/InputArea';
import TableArea from './components/TableArea/TableArea';

function App() {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for(let i in filteredList) {
      if(categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  const handleAddItem = (item: Item) => {
    const newItem: Item = {
      ...item,
      id: Date.now(),
    }

    let newList = [...list];
    newList.push(newItem);
    setList(newList);
  }

  const handleEditItem = (editedItem: Item) => {
    const updatedList = list.map((item) =>
        item.id === editedItem.id ? editedItem : item
    );
    setList(updatedList);
  };

  const handleDeleteItem = (deletedItem: Item) => {
      const updatedList = list.filter((item) => item.id !== deletedItem.id);
      setList(updatedList);
  };

  return (
    <div className="App">
      <h1>SenFinanças</h1>
      <div className="overviewArea">
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />
        <InputArea onAdd={handleAddItem} />
      </div>
      <div>
        <TableArea 
          list={filteredList}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </div>
    </div>
  );
}

export default App;
