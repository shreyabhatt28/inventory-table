import React, { useState, useEffect } from 'react';
import { Dialog, TextField, Button, Snackbar } from '@mui/material';

const EditModal = ({ open, selectedRow, items, setItems, handleCloseModal, setError }) => {

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
        const priceIsValid = Number.isInteger(Number(value.Price)) && value.Price >= 0;
        const quantityIsValid = Number.isInteger(Number(value.Quantity)) && value.Quantity >= 0;

        if (value.Name && value.Category && value.Price && value.Quantity) {
            if (priceIsValid && quantityIsValid) {
                setItems(prev => prev.map(item =>
                    item.ID === value.ID ? { ...item, ...value } : item
                ));
                handleCloseModal();
            } else {
                setError('Price and Quantity must be valid numbers and cannot be negative.');
            }
        } else {
            setError('Please fill in all fields.');
        }
    };

    return (
        <>
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
        </>
    );
};

export default EditModal;
