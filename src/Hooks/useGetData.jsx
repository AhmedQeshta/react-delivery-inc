import { useEffect, useState } from 'react';
import { getData, getInvoices } from '../Functions';

export default function useGetData() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
  const handleDeleteCustomer = async (selectedId) => {
    setAppData({
      ...appData,
      customers: appData.customers.filter(({ id }) => id !== selectedId),
    });
  };

  const { packages, customers } = appData;

  const handleOrder = (selectedId, order) => {
    const index = packages.findIndex(({ id }) => id === selectedId);
    if (order === 'up' && index === 0) return;
    if (order === 'down' && index === packages.length - 1) return;

    // swap packages by destructuring
    const [packageA, packageB] = [packages[index], packages[index + (order === 'up' ? -1 : 1)]];
    const newPackages = [...packages];
    newPackages[index] = packageB;
    newPackages[index + (order === 'up' ? -1 : 1)] = packageA;
    setAppData({
      ...appData,
      packages: newPackages,
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
