import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function InvoiceList({ invoices }) {
  // Render Message if no invoices
  if (invoices?.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={3}>No invoices found</TableCell>
      </TableRow>
    );
  }
  return invoices?.map(({ id, name, totalPrice, totalWeight }) => {
    return (
      <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>{name}</TableCell>
        <TableCell>{totalWeight} Kg </TableCell>
        <TableCell>{totalPrice} $ </TableCell>
      </TableRow>
    );
  });
}

InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
};
