import React from 'react';
import PropTypes from 'prop-types';
import { Button, TableCell, TableRow } from '@mui/material';

export default function CustomerList({ customers, handleRedirect, handleDeleteCustomer }) {
  // Render Message if no customers, any data
  if (customers?.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={4}>No customers found</TableCell>
      </TableRow>
    );
  }

  // Render customers list
  return customers?.map(({ id, name }) => {
    return (
      <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>
          <Button variant="contained" onClick={() => handleRedirect(id)}>
            Create Invoice
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="contained" color="error" onClick={() => handleDeleteCustomer(id)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  });
}

// define prop types, and validate props,
// if not valid, return error
CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  handleRedirect: PropTypes.func.isRequired,
  handleDeleteCustomer: PropTypes.func.isRequired,
};
