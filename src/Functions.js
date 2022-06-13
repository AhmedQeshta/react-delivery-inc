// fetch data from server and store it in state
const getData = async (abortController) => {
  const response = await fetch('/data.json', {
    signal: abortController?.signal,
  });
  const data = await response.json();
  return data;
};

// Handle Formatting of date
const handleFormatDate = (time) => {
  const date = new Date(time);
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

// generate invoice number
const generateInvoiceNo = () => Math.floor(Math.random() * 999999);

// calculate total price of packages
const calculateTotal = (invoice) => invoice.reduce((acc, { price }) => acc + price, 0);

// calculate total weight of packages
const calculateWeight = (invoice) =>
  invoice.reduce((acc, { weight }) => acc + parseFloat(weight.split('kg')[0]), 0);

// function to get customer name by id
const getCustomerName = (customers, id) => {
  const customer = customers?.find((customer) => customer.id === +id);
  return customer?.name;
};

// function to get packages by id
const getPackages = (packages, id) => packages?.filter(({ customerid }) => customerid === +id);

// validate Form
const validateForm = (weight, customerid, price) => {
  const errors = {};
  if (!weight) errors.weight = 'Weight is required';
  if (!customerid) errors.customerid = 'Customer is required';
  if (!price) errors.price = 'Price is required';
  if (weight && weight <= 1) errors.weight = 'Weight must be greater than 1 Kg';
  if (price && price <= 1) errors.price = 'Price must be greater than 1 $';
  return errors;
};

//  get all customers with total price and total wight
const getInvoices = (customers, packages) => {
  const collectionsPackages = (id) => getPackages(packages, id);
  return customers.map(({ id, name }) => ({
    id,
    name,
    totalPrice: calculateTotal(collectionsPackages(id)),
    totalWeight: calculateWeight(collectionsPackages(id)),
  }));
};

// list of links to display in drawer
const navBarList = [
  {
    name: 'Packages',
    link: '/packages',
  },
  {
    name: 'Customers',
    link: '/customers',
  },
  {
    name: 'Invoices',
    link: '/invoices',
  },
];

// export functions
export {
  getData,
  handleFormatDate,
  generateInvoiceNo,
  calculateTotal,
  calculateWeight,
  getCustomerName,
  getPackages,
  validateForm,
  navBarList,
  getInvoices,
};
