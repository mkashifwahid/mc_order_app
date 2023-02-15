import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Bottom from "react-bootstrap/Bottom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import MessageBox from '../component/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
//import Product from "../component/Product";
//import axios from "axios";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    //const { data } = await axios.get(`/api/products/${item.itemId}`);

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item,
    });
  };
  const checkoutHandler = () => {
    navigate('/signin?redirect=/customer');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.lenght === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.Id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <Link to={`/product/${item.Id}`}>{item.ItemDesc}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>Rs. {item.ItemRate}/-</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>
                    Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items)
                    <strong>
                      Rs. :{' '}
                      {cartItems.reduce(
                        (a, c) => a + c.ItemRate * c.quantity,
                        0
                      )}
                      /-
                    </strong>
                  </strong>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        onClick={checkoutHandler}
                        type="button"
                        variant="primary"
                        disabled={cartItems.lenght === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </ListGroup.Item>{' '}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
