import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCustomerName } from '../../Functions';

export default function PackageList({ packages, customers, handleDeletePackage, handleOrder }) {
  // Render Message if no packages
  if (packages?.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={4}>No packages found</TableCell>
      </TableRow>
    );
  }

  // Render packages
  return packages.map(({ id, weight, price, customerid }, index) => {
    return (
      <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell>{getCustomerName(customers, customerid)}</TableCell>
        <TableCell>{weight}</TableCell>
        <TableCell>{price} $ </TableCell>
        <TableCell sx={{ display: 'flex', gap: '0.5rem' }}>
          <IconButton
            aria-label="delete"
            size="medium"
            color="error"
            onClick={() => handleDeletePackage(id)}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton
              disabled={index === 0}
              aria-label="Up arrow"
              size="medium"
              color="secondary"
              disableRipple
              onClick={() => handleOrder(id, 'up')}>
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton
              disabled={index === packages.length - 1}
              aria-label="Up arrow"
              size="medium"
              color="info"
              disableRipple
              onClick={() => handleOrder(id, 'down')}>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    );
  });
}

// define prop types, and validate props,
// if not valid, return error
PackageList.propTypes = {
  packages: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  handleDeletePackage: PropTypes.func.isRequired,
  handleOrder: PropTypes.func.isRequired,
};
