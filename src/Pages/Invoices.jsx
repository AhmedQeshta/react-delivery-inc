import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { InvoiceList } from '../components';

export default function Invoices({ invoices }) {
  return (
    <TableContainer component={Paper} sx={{ width: '80%', m: '2rem auto ' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Total Weight</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Invoice List */}
          <InvoiceList invoices={invoices} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// define prop types, and validate props,
// if not valid, return error
Invoices.propTypes = {
  invoices: PropTypes.array.isRequired,
};
