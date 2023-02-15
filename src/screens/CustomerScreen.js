import { useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/AccordionCollapse';
import MessageBox from '../component/MessageBox';
import LoadingBox from '../component/LoadingBox';
import Customer from '../component/Customer';
//import data from '../data';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../component/CheckoutSteps';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, customers: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function CustomerScreen() {
  const [{ loading, error, customers }, dispatch] = useReducer(
    logger(reducer),
    {
      customers: [],
      loading: true,
      error: '',
    }
  );

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/customers');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Helmet>
        <title>Customer Information</title>
      </Helmet>
      <h1>List of Customer</h1>
      {/* <div className=""> */}
      <div className="customers container small-container">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {customers.map((customer) => (
              <Col key={customer.CsCode} sm={12} md={12} lg={12}>
                <Customer customer={customer}></Customer>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default CustomerScreen;
