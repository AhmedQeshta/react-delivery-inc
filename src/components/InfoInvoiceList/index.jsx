import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { calculateTotal, calculateWeight } from '../../Functions';
import { PropTypes } from 'prop-types';

export default function InfoInvoiceList({ infoInvoice }) {
  return (
    <>
      {infoInvoice.map(({ id, weight, price }) => (
        <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="left">{id}</TableCell>
          <TableCell align="left">{weight}</TableCell>
          <TableCell align="left" sx={{ background: '#efefef' }}>
            {price} ${' '}
          </TableCell>
        </TableRow>
      ))}

      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="left"></TableCell>
        <TableCell align="left">{calculateWeight(infoInvoice)}kg</TableCell>
        <TableCell align="left" sx={{ background: '#efefef' }}>
          Total : {calculateTotal(infoInvoice)} $
        </TableCell>
      </TableRow>
    </>
  );
}

// define prop types, and validate props,
// if not valid, return error
InfoInvoiceList.propTypes = {
  infoInvoice: PropTypes.array.isRequired,
};
