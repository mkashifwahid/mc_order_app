import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../component/CheckoutSteps';

export default function AddCustomer() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { customerInfo },
  } = state;

  const [customerCode, setCustomerCode] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/customer');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_CUSTOMER',
      payload: {
        customerCode,
      },
    });
    localStorage.setItem(
      'customerInfo',
      JSON.stringify({
        // code,
      })
    );
    navigate('/checkout');
  };
  return (
    <div>
      <Helmet>
        <title>Order Customer</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h3>Customer Information</h3>
        <Form onSubmit={submitHandler}>
          <div>
            <Button variat="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
