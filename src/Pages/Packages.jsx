import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Modal, PackageList } from '../components';
import usePackage from '../Hooks/usePackage';

export default function Packages({
  appData: { packages, customers },
  handleDeletePackage,
  setInvoices,
  handleOrder,
}) {
  // Custom hook to manage packages
  const { handleChange, handleSubmit, handleToggleModal, open, modalForm, errors } = usePackage(
    packages,
    customers,
    setInvoices,
  );

  return (
    <>
      <TableContainer sx={{ width: '80%', m: '2rem auto ' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>

              <TableCell>
                <IconButton
                  onClick={handleToggleModal}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu">
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* List of packages */}
            <PackageList
              packages={packages}
              customers={customers}
              handleDeletePackage={handleDeletePackage}
              handleOrder={handleOrder}
            />
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display Modal */}
      <Modal
        open={open}
        handleClose={handleToggleModal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        modalForm={modalForm}
        customers={customers}
        errors={errors}
      />
    </>
  );
}

// define prop types, and validate props,
// if not valid, return error
Packages.propTypes = {
  appData: PropTypes.object.isRequired,
  handleDeletePackage: PropTypes.func.isRequired,
  setInvoices: PropTypes.func.isRequired,
  handleOrder: PropTypes.func.isRequired,
};
