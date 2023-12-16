import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePlanAsync } from '../actions/authSlice';

const UpdatePlanPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); 

  const [plansData, setPlansData] = useState({ telecomPlans: [] });

  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch('http://localhost:9010/get-plans');
        const data = await response.json();
        setPlansData(data);
      } catch (error) {
        console.error('Error fetching plans data:', error);
      }
    };

    fetchPlansData();
  }, []);

  const handleUpdatePlan = async (planId) => {
    try {
     // Dispatch the updatePlanAsync thunk to update the plan in Redux store
      await dispatch(updatePlanAsync({ email: sessionStorage.getItem('email'), planId }));

      // Show a success notification
      toast.success('Plan updated successfully to '+planId, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error('Error updating user plan:', error);
    }
  };

  return (
    <Container className="p-3">
      <img src='images/expense-image.png' width={300} height={200} alt="Expense Management" />
      <h1 className="header">Expense Management Application</h1>
      <h2>Update Plans</h2>
      <br />
      <h4>Hello, {userData.user.name}!</h4>
      <Card style={{ width: '64rem' }}>
        <Card.Body>
          <Card.Link as={Link} to="/home">
            Home
          </Card.Link>
          <Card.Link as={Link} to="/logout">
            LogOut
          </Card.Link>
        </Card.Body>
      </Card>
      <Card style={{ width: '64rem' }}>
        <Card.Body>
            <Card.Title>Current Plan</Card.Title>
            <Card.Title>{userData.user.email}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Plan ID: {userData.user.plan.planId}</Card.Subtitle>
            <Card.Text>
            Plan Name: {userData.user.plan.planName}
            </Card.Text>
          </Card.Body>
      </Card>
      <br></br>
      <Card style={{ width: '64rem' }}>
        <Card.Body>
          <Card.Title>Available Plans</Card.Title>
          <ListGroup>
            {plansData.telecomPlans.map((plan) => (
              <ListGroup.Item key={plan.planId}>
                <strong>Plan Name:</strong> {plan.planName}
                <br />
                <strong>Data Allowance:</strong> {plan.dataAllowanceGB} GB
                <br />
                <strong>Minutes:</strong> {plan.minutes}
                <br />
                <strong>Text Messages:</strong> {plan.textMessages}
                <br />
                <strong>International Roaming:</strong>{' '}
                {plan.internationalRoaming ? 'Yes' : 'No'}
                <br />
                <strong>Monthly Cost:</strong> ₹{plan.monthlyCost}
                <br />
                <Button
                  variant="primary"
                  onClick={() => handleUpdatePlan(plan.planId)}
                >
                  Select {plan.planName} 
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
       {/* ToastContainer for notifications */}
       <ToastContainer />
    </Container>
  );
};

export default UpdatePlanPage;
