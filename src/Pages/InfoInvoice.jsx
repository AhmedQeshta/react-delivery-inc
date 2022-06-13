import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { handleFormatDate, generateInvoiceNo, getCustomerName, getPackages } from '../Functions';
import { InfoInvoiceList } from '../components';

export default function InfoInvoice({ appData: { packages, customers } }) {
  // get id from url
  const { id } = useParams();

  // get package by id and customer by id, and then convert params id to number
  const customer = getCustomerName(customers, id);
  const invoice = getPackages(packages, id);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: '5rem 8rem' }}>
      {/* header Invoice */}
      <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', pb: '2rem' }}>
        <Box component="div" sx={{ fontSize: '2xl', fontWeight: 'bold' }}>
          {handleFormatDate(new Date())}

          <Box mb={0} component="h2">
            {customer}
          </Box>
        </Box>
        <Box component="div" sx={{ fontSize: '2xl', fontWeight: 'bold' }}>
          <Box mt={0} component="h2">
            Invoice
          </Box>
          No. {generateInvoiceNo()}
        </Box>
      </Box>

      {/* body Invoice */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Package ID</TableCell>
              <TableCell align="left">Weight</TableCell>
              <TableCell align="left" sx={{ background: '#efefef', border: '2px sold #333' }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <InfoInvoiceList infoInvoice={invoice} />
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Invoice */}
      <Box
        component="div"
        sx={{
          textAlign: 'center',
          pt: '5rem',
          fontSize: '2xl',
          fontWeight: 'bold',
          width: '100%',
        }}>
        You received {invoice?.length} packages
        <br />
        Thank you for using our services
      </Box>
    </Box>
  );
}

// define prop types, and validate props,
// if not valid, return error
InfoInvoice.propTypes = {
  appData: PropTypes.shape({
    packages: PropTypes.arrayOf(PropTypes.object).isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
