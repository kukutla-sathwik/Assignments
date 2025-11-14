import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <ProductList />
      <CartDrawer />
    </>
  );
};

export default App;
