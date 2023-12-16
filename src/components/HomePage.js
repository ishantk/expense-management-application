import React from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const HomePage = () => {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  console.log("Authentication:"+isAuthenticated);
  console.log("User Data:"+JSON.stringify(userData));

  return (
    <div>
      {isAuthenticated ? (
        <Container className="p-3">
        <img src='images/expense-image.png' width={300} height={200}/>
        <h1 className="header">Expense Management Application</h1>
        <br/>
        <h4>Welcome, {userData.user.name}!</h4>
        <Card style={{ width: '64rem' }}>
          <Card.Body>
          <Card.Link><Link to="/plan">My Plan</Link></Card.Link>
            <Card.Link><Link to="/usage">Usage</Link></Card.Link>
            <Card.Link><Link to="/usage-analysis">Usage Analysis</Link></Card.Link>
            <Card.Link><Link to="/recommendation">Plan Recommendation</Link></Card.Link>
            <Card.Link><Link to="/update-plan">Update Plan</Link></Card.Link>
            <Card.Link><Link to="/logout">LogOut</Link></Card.Link>
        </Card.Body>
        </Card>
          <Card style={{ width: '64rem' }}>
          <Card.Body>
            <Card.Title>{userData.user.email}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Plan ID: {userData.user.plan.planId}</Card.Subtitle>
            <Card.Text>
            Plan Name: {userData.user.plan.planName}
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
      ) : (
        <p>Please Login First</p>
      )}
    </div>
  );
};

export default HomePage;