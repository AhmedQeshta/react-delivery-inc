import { DialogContent, TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function NumberInput({ value, errors, handleChange, label, name, mt = 0 }) {
  return (
    <DialogContent sx={{ width: '80%' }}>
      <TextField
        sx={{ width: '100%', mt }}
        type="number"
        size="medium"
        name={name}
        id={name}
        value={value}
        error={!!errors}
        helperText={errors}
        onChange={handleChange}
        label={label}
        variant="outlined"
      />
    </DialogContent>
  );
}

// define prop types
NumberInput.propTypes = {
  value: PropTypes.string.isRequired,
  errors: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  mt: PropTypes.string,
};
