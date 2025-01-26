// Popup for editing item details

import React, { useState, useEffect } from 'react';
import { Dialog, TextField, Button } from '@mui/material';

const EditModal = ({ open, selectedRow, items, setItems, handleCloseModal}) => {

    const [value, setValue] = useState({
        ID: '',
        Name: '',
        Category: '',
        Price: '',
        Quantity: ''
    });

    useEffect(() => {
        if (selectedRow) {
            const item = items.find(item => item.ID === selectedRow.ID);
            if (item) {
                setValue({
                    ID: item.ID,
                    Name: item.Name,
                    Category: item.Category,
                    Price: item.Price,
                    Quantity: item.Quantity
                });
            }
        }
    }, [selectedRow, items]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleSave = () => {
        setItems(prev => prev.map(item => 
            item.ID === value.ID ? { ...item, ...value } : item
        ));
        handleCloseModal();
    };

    return (
        <Dialog open={open}>
            <div style={{ padding: '20px' }}>
                <TextField
                    name="Name"
                    label="Name"
                    value={value.Name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="Category"
                    label="Category"
                    value={value.Category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="Price"
                    label="Price"
                    value={value.Price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="Quantity"
                    label="Quantity"
                    value={value.Quantity}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSave} style={{ marginTop: '10px' }}>
                    Save Changes
                </Button>
            </div>
        </Dialog>
    );
};

export default EditModal;
