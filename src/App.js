import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DrawerComponent, Loading, NavBar, ErrorComponent } from './components';
import useGetData from './Hooks/useGetData';
import { Customer, Invoices, Packages, InfoInvoice } from './Pages';
import './App.css';

function App() {
  // get data from API and set it to state, use custom hook
  const {
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
  } = useGetData();

  // if data is loading, show loading component
  if (isLoading) {
    return <Loading />;
  }
  // if there is an error, show error component
  if (error) {
    return <ErrorComponent error={error} />;
  }
  // if no data show error component not found
  if (!appData) {
    return <ErrorComponent error="Not Found any data" />;
  }

  // destructuring data from appData
  const { customers } = appData;

  return (
    <>
      {/* Nav bar Component to show side bar */}
      <NavBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

      {/* Routes  */}
      <Switch>
        <Route
          path="/customers"
          children={<Customer handleDeleteCustomer={handleDeleteCustomer} customers={customers} />}
        />
        <Route
          path="/packages"
          children={
            <Packages
              appData={appData}
              handleDeletePackage={handleDeletePackage}
              setInvoices={setInvoices}
              handleOrder={handleOrder}
            />
          }
        />
        <Route path="/invoices" children={<Invoices invoices={invoices} />} />
        <Route path="/invoice/:id" children={<InfoInvoice appData={appData} />} />
        <Route
          index
          children={<Customer handleDeleteCustomer={handleDeleteCustomer} customers={customers} />}
        />
      </Switch>

      {/* Drawer Component to show side bar */}
      <DrawerComponent isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </>
  );
}

export default App;
