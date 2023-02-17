import { useEffect, useReducer, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import MessageBox from '../component/MessageBox';
import LoadingBox from '../component/LoadingBox';
import Product from '../component/Product';
//import data from '../data';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../component/CheckoutSteps';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  console.log(state, 'state');
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!userInfo) {
      console.log(userInfo, '1');
      navigate('/signin?redirect=/placeorder');
    } else {
      console.log(userInfo, '2');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
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
        <title>Booker App</title>
      </Helmet>
      <div>
        <h1>List of Products</h1>{' '}
      </div>
      <div className="topnav">
        <div className="topnav-right">
          <Link to="/cart" className="nav-link">
            View Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce(
                  (a, c) => Number(a) + Number(c.quantity),
                  0
                )}
              </Badge>
            )}
          </Link>
        </div>
      </div>
      <Card className="card-prod">
        <Card.Body>
          <Row>
            <Col xs={6} className="prod-col">
              <strong>Product</strong>
            </Col>
            <Col xs={2} className="prod-col">
              <strong>Price</strong>
            </Col>
            <Col xs={3} className="prod-col">
              <strong>Quantity</strong>
            </Col>
            <Col xs={1} className="prod-col">
              <strong>
                {' '}
                <i className="fa-solid fa-cart-shopping"></i>
              </strong>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.Id} sm={12} md={12} lg={12}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
