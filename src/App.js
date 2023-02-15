import logo from './logo.svg';
//import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useContext } from 'react';
import { Store } from './Store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SearchScreen from './screens/SearchScreen';
import SigninScreen from './screens/SigninScreen';
import CustomerScreen from './screens/CustomerScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import HomeScreen from './screens/HomeScreen';
import AddCustomer from './screens/AddCustomer';

function App() {
  // const navigate = useNavigate();
  // const { state } = useContext(Store);
  // const { userInfo } = state;

  // useEffect(() => {
  //   console.log('a');
  //   if (!userInfo) {
  //     navigate('/signin?redirect=/customer');
  //   }
  // }, [userInfo, navigate]);

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:Id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/addcustomer" element={<AddCustomer />} />
              <Route path="/customer" element={<CustomerScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/products" element={<HomeScreen />} />
              <Route path="/" element={<SigninScreen />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
