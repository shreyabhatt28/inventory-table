import React from 'react';
import { TextField } from '@mui/material';
import '../App.css';

const FilterInput = ({ handleFilter }) => {
    return (
        <div className="filter-input">
            <TextField
                label="Filter Category"
                variant="outlined"
                onChange={handleFilter}
                fullWidth
            />
        </div>
    );
};

export default FilterInput;
