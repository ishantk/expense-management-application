import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../actions/authSlice';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(loginAsync({ email, password })).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        sessionStorage.setItem('email', email.toString());
        setTimeout(() => navigate("/home"), 400);
      }
    });
  };

  return (
    <div>
    <Container className="p-3">
    <img src='images/expense-image.png' width={300} height={200}/>
    <h1 className="header">Expense Management Application</h1>
    <br/>
    <h3>Enter Details to Login</h3>
  <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
       </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
     
      <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>
    </Form>
    </Container>
    </div>

  );
};

export default LoginPage;
