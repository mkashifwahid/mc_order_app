import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
//import axios from "axios";
import { useContext, useState } from 'react';
import { Store } from '../Store';
import NumberFormat from './NumberFormat';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [itemQuantity, setQuantity] = useState(0);

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.Id === product.Id);
    const quantity = existItem
      ? Number(existItem.quantity) + Number(itemQuantity)
      : itemQuantity;
    //const {data} = await axios.get(`/api/products/${item.itemId}`)
    if (itemQuantity > 0) {
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
    }
  };

  return (
    <Card className="card-prod">
      <Card.Body className="card-prod-body">
        <Row>
          {/* <Link to={`/product/${product.Id}`}> */}
          {/* <Card.Text>
            <strong>
              {product.ItemDesc}-{product.ItemUnit}
            </strong>
          </Card.Text> */}
          {/* //</Link> */}
        </Row>
        <Row className="row-prod">
          <Col xs={6} className="prod-col">
            {product.ItemDesc}-{product.ItemUnit}
          </Col>
          <Col xs={2} className="prod-col prod-price-col">
            <span className="rate-col">
              <NumberFormat value={product.ItemRate} decimal={2} />
            </span>
          </Col>
          {/* <Col className="number">
            <NumberFormat value={product.ItemDisc} decimal={2} /> %
          </Col>
          <Col className="number">
            <NumberFormat value={product.ItemSTax} decimal={2} />
          </Col> */}
          {/* </Row>
        <Row> */}
          <Col xs={3} className="prod-col">
            {/* <input
              type="button"
              className="qty-btn"
              variant="light"
              disabled={itemQuantity < 1}
              onClick={() => setQuantity(itemQuantity - 1)}
              value="++"
            /> */}
            {/* <i className="fas fa-minus-circle"></i> */}
            {/* </Button> */}
            {/* <InputGroup className="mb-3">
              <InputGroup.Text></InputGroup.Text>
              <Form.Control aria-label="Amount (to the nearest dollar)" />
            </InputGroup> */}
            {/* <input
              type="number"
              onFocus={(e) => e.target.select()}
              placeholder="Quantity"
              value={itemQuantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input> */}
            {/* <span>{item.quantity}</span>{' '} */}
            {/* <Button
              className="qty-btn"
              variant="light"
              onClick={() => setQuantity(Number(itemQuantity) + 1)}
            >
              <i className="fas fa-plus-circle qty-btn  "></i>
            </Button> */}

            <div class="input-group">
              <input
                type="button"
                value="-"
                class="button-minus"
                // data-field="quantity"
                disabled={itemQuantity < 1}
                onClick={() => setQuantity(itemQuantity - 1)}
              />
              <input
                onFocus={(e) => e.target.select()}
                type="number"
                step="1"
                max=""
                value={itemQuantity}
                name="quantity"
                class="quantity-field"
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="button"
                value="+"
                class="button-plus"
                data-field="quantity"
                onClick={() => setQuantity(Number(itemQuantity) + 1)}
              />
            </div>
          </Col>
          <Col xs={1} className="prod-col">
            <span className="cart-span">
              <i className="fa-solid fa-cart-shopping"></i>

              <input
                className="button-cart"
                type="button"
                data-field="quantity"
                onClick={() => addToCartHandler(product)}
              />
            </span>
            {/* <Button
              // variant="light"
              className="qty-btn cart-btn"
              onClick={() => addToCartHandler(product)}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </Button> */}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Product;
