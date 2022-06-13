import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';

export default function Modal({
  open,
  handleClose,
  handleSubmit,
  handleChange,
  modalForm,
  customers,
  errors,
}) {
  const { weight, customerid, price } = modalForm;

  return (
    <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit} className="form__container">
        <DialogTitle sx={{ fontWeight: 'bold' }} color="primary">
          Add New Package
        </DialogTitle>

        {/* Weight Input */}
        <NumberInput
          value={weight}
          errors={errors.weight}
          handleChange={handleChange}
          label="Enter Weight"
          name="weight"
          mt={'0.5rem'}
        />

        {/* Price Input */}
        <NumberInput
          value={price}
          errors={errors.price}
          handleChange={handleChange}
          label="Enter price"
          name="price"
        />

        {/* customer Input */}
        <SelectInput
          errors={errors.customerid}
          value={customerid}
          handleChange={handleChange}
          label="Select Customer"
          name="customerid"
          options={customers}
        />

        <DialogActions sx={{ mb: '0.5rem' }}>
          <Button type="submit" variant="contained">
            Add Package
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

// define prop types, and validate props,
// if not valid, return error
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  modalForm: PropTypes.object.isRequired,
  customers: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
};
