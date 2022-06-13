import {
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function SelectInput({ errors, value, handleChange, label, name, options }) {
  return (
    <DialogContent sx={{ width: '80%' }}>
      <FormControl
        sx={{ width: '100%', mb: '0.5rem' }}
        size="medium"
        label={label}
        error={!!errors}
        variant="outlined">
        <InputLabel size="medium">{label}</InputLabel>
        <Select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}>
          {options?.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors}</FormHelperText>
      </FormControl>
    </DialogContent>
  );
}

// define prop types, and validate props,
// if not valid, return error
SelectInput.propTypes = {
  errors: PropTypes.string,
  value: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
