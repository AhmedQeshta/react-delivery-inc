import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import { CustomerList } from '../components';

export default function Customer({ customers, handleDeleteCustomer }) {
  const history = useHistory();

  const handleRedirect = (id) => {
    history.push(`/invoice/${id}`);
  };

  return (
    <TableContainer component={Paper} sx={{ width: '80%', m: '2rem auto ' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <CustomerList
            customers={customers}
            handleRedirect={handleRedirect}
            handleDeleteCustomer={handleDeleteCustomer}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// define prop types, and validate props,
// if not valid, return error
Customer.propTypes = {
  customers: PropTypes.array.isRequired,
  handleDeleteCustomer: PropTypes.func.isRequired,
};
