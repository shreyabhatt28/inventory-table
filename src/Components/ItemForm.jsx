import React, { useEffect, useState } from 'react'
import '../App.css'
import { TextField,Button } from '@mui/material'

const ItemForm = ({formData,handleChange,submitData}) => {

  return (
    <div className='form-div'>
      <TextField placeholder='item name' label="Name" variant="outlined" required onChange={handleChange} name='Name' value={formData.Name}/>
      <TextField placeholder='item category' label="Category" variant="outlined" required onChange={handleChange} name='Category' value={formData.Category}/>
      <TextField placeholder='price in rupees' label="Price" variant="outlined" required onChange={handleChange} name='Price' value={formData.Price}/>
      <TextField placeholder='item quantity' label="Quantity" variant="outlined" required onChange={handleChange} name='Quantity' value={formData.Quantity}/>
      <Button variant='contained' onClick={submitData}>Add Item</Button>
    </div>
  )
}

export default ItemForm