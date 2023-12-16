import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/authSlice';
import { useDispatch } from 'react-redux';

const LogoutPage = () => {
  
  const dispatch = useDispatch();
  dispatch(logout());

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
      <div>
      <Container className="p-3">
      <img src='images/expense-image.png' alt='' width={300} height={200}/>
      <h1 className="header">Thank You for useNavigate Expense Management Application</h1>
      <p>
      Pocket-friendly plans at your fingertips: Revolutionizing telecom expense management for a seamless, cost-effective journey!
      </p>
      <p>
        <Button variant="primary" onClick={handleButtonClick}>Login Again</Button>
      </p>
      </Container>
    </div>
  );
};

export default LogoutPage;