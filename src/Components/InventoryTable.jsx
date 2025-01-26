// Displays the table and functionality (like filtering)

import React, { useState, useEffect } from 'react';
import '../App.css';
import DataTable from 'react-data-table-component';
import { Alert, Snackbar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import EditModal from './EditModal';
import FilterInput from './FilterInput';

const InventoryTable = ({ items, error, setItems }) => {
  
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (filter) {
      setFilteredItems(items.filter(item => 
        item.Category.toLowerCase().includes(filter.toLowerCase())
      ));
    } else {
      setFilteredItems(items);
    }
  }, [filter, items]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (row) => {
    setIsEditing(true);
    setSelectedRow(row);
  };

  const handleDelete = (row) => {
    const updatedItems = items.filter(item => item.ID !== row.ID);
    setItems(updatedItems);
  };

  function handleCloseModal() {
    setIsEditing(false);
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.Name,
    },
    {
      name: "Category",
      selector: row => row.Category,
    },
    {
      name: "Price",
      selector: row => row.Price,
    },
    {
      name: "Quantity",
      selector: row => row.Quantity,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="actions">
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={() => handleEdit(row)}
          >
            <EditIcon />
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            size="small"
            onClick={() => handleDelete(row)}
          >
            <Delete />
          </Button>
        </div>
      ),
    },
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

    {items.length>1 && <FilterInput handleFilter={handleFilter}/>}

      {filteredItems.length > 0 ? (
        <div className="inv-table">
          <DataTable
            columns={columns}
            data={filteredItems}
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
      ) : (
        <p className="no-items">No items in inventory</p>
      )}

      {error && (
        <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}

      <EditModal
        open={isEditing}
        selectedRow={selectedRow}
        items={items}
        setItems={setItems}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default InventoryTable;
