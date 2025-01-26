import React, { useState, useEffect } from 'react'
import '../App.css'
import DataTable from 'react-data-table-component'
import { Alert, Snackbar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';


const InventoryTable = ({items,error}) => {

  const [open,setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.Name,
    },
    {
      name:"Category",
      selector: row => row.Category,
    },
    {
      name:"Price",
      selector: row => row.Price,
    },
    {
      name:"Quantity",
      selector: row => row.Quantity,
      sortable:true
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="actions">
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            >
            <EditIcon />
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            size="small" >
            <Delete/>
          </Button>
        </div>
      ),
    }
  ];

  const conditionalRowStyles = [
    {
      when: row => row.Quantity < 10,
      style: {
        backgroundColor: '#f0c5c5',
        color: 'red',
      },
    },
  ];

  return (
    <>
    {items.length > 0 ? (
      <div className='inv-table'>
        <DataTable
          columns={columns}
          data={items}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    ) : (
      <p className='no-items'>No items in inventory</p>
    )}
    {error && 
    <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity="error"
      variant="filled"
      sx={{ width: '100%' }}
    >
      {error}
    </Alert>
  </Snackbar>}
    </>
  );
}

export default InventoryTable