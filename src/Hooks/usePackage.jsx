import { useState } from 'react';
import { getInvoices, validateForm } from '../Functions';

export default function usePackage(packages, customers, setInvoices) {
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({ weight: '', customerid: '', price: '' });
  const [errors, setErrors] = useState({});

  const clearForm = () => {
    // set Errors to empty object,then set Modal Form to empty object
    setModalForm({ weight: '', customerid: '', price: '' });
    setErrors({});
  };

  // Handle Toggle Modal, set open to true or false
  const handleToggleModal = () => {
    setOpen(!open);
    clearForm();
  };

  // handleSubmit function to add new package
  const handleSubmit = (e) => {
    e.preventDefault();
    // validate form
    const { weight, customerid, price } = modalForm;
    const valid = validateForm(weight, customerid, price);
    if (Object.keys(valid).length) {
      setErrors(valid);
      return;
    }

    /* add new package to packages array, 
    then set packages array to state */
    const newPackage = {
      id: `pak${packages.length + 1}`,
      weight: `${weight}kg`,
      customerid,
      price: +price,
      shippingOrder: packages.length + 1,
    };
    packages.push(newPackage);

    //  get all customers with total price and total wight
    const invoices = getInvoices(customers, packages);
    setInvoices(invoices);

    // set close modal to true then clear form with errors
    setOpen(false);
    clearForm();
  };

  // handle Change input to set modal form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // reset errors if input is changed
    if (name === 'weight' || name === 'price' || name === 'customerid') {
      setErrors({ ...errors, [name]: '' });
    }
    setModalForm({ ...modalForm, [name]: value });
  };

  return { handleChange, handleSubmit, handleToggleModal, open, modalForm, errors };
}
