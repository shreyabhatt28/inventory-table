import './App.css'
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ItemForm from './Components/ItemForm'
import InventoryTable from './Components/InventoryTable'

function App() {
  const [formData, setFormData] = useState({
    ID:'',
    Name: '',
    Category: '',
    Price: '',
    Quantity: ''
  });

  const [error,setError] = useState('');
  const [items,setItems] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitData() {
    if (formData.Name && formData.Category && formData.Price && formData.Quantity) {
      const priceIsValid = Number.isInteger(Number(formData.Price)) && formData.Price >= 0;
      const quantityIsValid = Number.isInteger(Number(formData.Quantity)) && formData.Quantity >= 0;
  
      if (priceIsValid && quantityIsValid) {

        const newItem = {...formData, ID : uuid() };

        setItems(prev => [...prev, newItem]);
  
        setFormData({
          ID: '',
          Name: '',
          Category: '',
          Price: '',
          Quantity: ''
        });
      } else {
        setError('Price and Quantity must be valid values.');
      }
    } else {
      setError('Please fill in all fields.');
    }
  }
  

  return(
    <>
    <ItemForm error={error} formData={formData} handleChange={handleChange} submitData={submitData}/>
    <InventoryTable items={items} error={error}/>
    </>
  )
}

export default App
