import { useEffect, useState } from 'react';
import { getData, getInvoices } from '../Functions';

export default function useGetData() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { packages, customers } = appData;

  // handle delete customer, then update state with new data
  const handleDeleteCustomer = async (selectedId) => {
    // update packages with new customerid null
    const newPackages = packages.map((packages) => {
      if (packages.customerid === selectedId) {
        return { ...packages, customerid: null };
      }
      return packages;
    });

    // get package with customer id not null
    const filteredPackages = newPackages.filter(({ customerid }) => customerid !== null);

    setAppData({
      packages: filteredPackages,
      customers: appData.customers.filter(({ id }) => id !== selectedId),
    });
  };

  // handle Reorder Packages, then update state with new data
  const handleOrder = (selectedId, order) => {
    // get packages by id, then check if first or last
    const index = packages.findIndex(({ id }) => id === selectedId);
    if (order === 'up' && index === 0) return;
    if (order === 'down' && index === packages.length - 1) return;

    // swap packages by destructuring,if up then swap with previous, if down then swap with next
    const [packageA, packageB] = [packages[index], packages[index + (order === 'up' ? -1 : 1)]];
    packages[index] = packageB;
    packages[index + (order === 'up' ? -1 : 1)] = packageA;
    setAppData({
      ...appData,
      packages: packages,
    });
  };

  // handle Delete Package
  const handleDeletePackage = async (selectedId) => {
    // remove package from packages array
    const newPackages = packages.filter(({ id }) => id !== selectedId);

    // set new packages array to state
    setAppData({ ...appData, packages: newPackages });
  };

  // get data from API and set it to state,
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
    const abortController = new AbortController();
    setIsLoading(true);
    (async () => {
      try {
        const { packages, customers } = await getData(abortController);
        const orderedPackages = packages.sort((a, b) => a.shippingOrder - b.shippingOrder);
        setAppData({ customers, packages: orderedPackages });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setError(null);
      }
    })();

    return () => abortController.abort();
  }, []);

  // get invoices, and set to state when data is loaded, useEffect
  useEffect(() => {
    //  get all customers with total price and total wight
    const invoices = getInvoices(customers, packages);
    setInvoices(invoices);
  }, [customers, packages]);

  return {
    appData,
    isLoading,
    error,
    isDrawerOpen,
    setIsDrawerOpen,
    handleDeleteCustomer,
    handleDeletePackage,
    invoices,
    setInvoices,
    handleOrder,
  };
}
