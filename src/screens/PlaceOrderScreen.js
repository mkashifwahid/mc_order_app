import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../component/CheckoutSteps';
import LoadingBox from '../component/LoadingBox';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { toast } from 'react-toastify';
import { getError } from '../util';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  useEffect(() => {
    if (!cart.customerInfo) {
      navigate('/customer');
    }
  }, [cart, navigate]);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = 0;
  cart.itemsDiscount = 0;
  cart.itemsSTax = 0;
  round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.ItemRate, 0));

  cart.orderTotal = cart.itemsPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          customer: cart.customerInfo.customer.CsCode,
          bookerUserId: userInfo.code,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order.BknghID}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1>Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Customer Information</Card.Title>
              <Card.Text>
                {/* <Row>
                  <Col md={3}>
                    <strong>Name :</strong>
                  </Col>
                  <Col md={2}> {cart.customerInfo.customer.CsCode}</Col>
                  <Col>{cart.customerInfo.customer.CsName}</Col>
                </Row> */}
                {/* <Row>
                  <Col md={3}>
                    <strong>Address :</strong>
                  </Col>
                  <Col>{cart.customerInfo.customer.CsAddrs}</Col>
                </Row> */}
                {/* <Row>
                  <Col md={3}>
                    <strong>CNIC :</strong>
                  </Col>
                  <Col>{cart.customerInfo.customer.CsCNIC}</Col>
                </Row> */}
                {/* <Row>
                  <Col md={3}>
                    <strong>NTN :</strong>
                  </Col>
                  <Col>{cart.customerInfo.customer.CsNTNO}</Col>
                </Row> */}
                {/* <Row>
                  <Col md={3}>
                    <strong>Market :</strong>
                  </Col>
                  <Col>{cart.customerInfo.customer.MarketName}</Col>
                </Row> */}
              </Card.Text>
              <Link to="/customer">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item.Id}>
                    <Row className="align-items-center">
                      <Col md={7}>
                        <Link to={`/product/${item.ItemCode}`}>
                          {item.ItemDesc}
                        </Link>
                      </Col>
                      <Col md={2}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.ItemRate}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Discount</Col>
                    <Col>{cart.itemsDiscount.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>S.Tax</Col>
                    <Col>{cart.itemsSTax.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>{cart.orderTotal.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
