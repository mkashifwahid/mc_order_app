import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { getError } from '../util';
import { Store } from '../Store';
import CheckoutSteps from '../component/CheckoutSteps';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  //test
  const { Id } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    if (!cart.customerInfo) {
      navigate('/customer');
    }
  }, [cart, navigate]);

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/product/Id/${Id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, [Id]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x.Id === product.Id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // const {data} = await axios.get(`/api/product${product.itemId}`);

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
    navigate('/Cart');
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <CheckoutSteps step1 step2 />
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Helmet>
                <title>{product.ItemDesc}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>{product.ItemDesc}</h3>
              <Row>
                <Col xs={4}>Company</Col>
                <Col>{product.Cmp_Name}</Col>
              </Row>
              <Row>
                <Col xs={4}>Group</Col>
                <Col>{product.Group_Desc}</Col>
              </Row>
              <Row>
                <Col xs={4}>Price</Col>
                <Col className="number">{product.ItemRate}</Col>
              </Row>
              <Row>
                <Col xs={4}>Discount</Col> <Col>{product.ItemDisc}%</Col>
              </Row>
              <Row>
                <Col xs={4}>Sales Tax</Col>
                <Col>{product.ItemStax}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>{product.ItemRate}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} variant="primary">
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
