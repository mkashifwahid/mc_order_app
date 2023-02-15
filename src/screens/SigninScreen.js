import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/esm/Form';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../util';

export default function SigninScreen() {
  console.log('sign in');
  const naviagte = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/customer';

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        code,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      naviagte(redirect || '/customer');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      naviagte(redirect);
    }
  }, [naviagte, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="Code">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
      </Form>
    </Container>
  );
}
