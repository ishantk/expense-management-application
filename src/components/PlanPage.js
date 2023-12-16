import React from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const PlanPage = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);

  console.log("isAuthenticated:"+isAuthenticated);
  console.log("userData:"+userData);

  return (
    <div>
      {isAuthenticated ? (
        <Container className="p-3">
        <img src='images/expense-image.png' width={300} height={200}/>
        <h1 className="header">Expense Management Application</h1>
        <br/>
        <h4>Telecom Plan For: {userData.user.name}!</h4>
        <Card style={{ width: '64rem' }}>
          <Card.Body>
          <Card.Link><Link to="/home">Home</Link></Card.Link>
          <Card.Link><Link to="/logout">LogOut</Link></Card.Link>
        </Card.Body>
        </Card>
          <Card style={{ width: '64rem' }}>
          <Card.Body>
          <Card.Title>Plan Details</Card.Title>
          <Card.Text>
            <strong>Plan ID:</strong> {userData.user.plan.planId}
          </Card.Text>
          <Card.Text>
            <strong>Plan Name:</strong> {userData.user.plan.planName}
          </Card.Text>
          <Card.Text>
            <strong>Data Allowance:</strong> {userData.user.plan.dataAllowanceGB} GB
          </Card.Text>
          <Card.Text>
            <strong>Minutes:</strong> {userData.user.plan.minutes}
          </Card.Text>
          <Card.Text>
            <strong>Text Messages:</strong> {userData.user.plan.textMessages}
          </Card.Text>
          <Card.Text>
            <strong>International Roaming:</strong> {userData.user.plan.internationalRoaming ? 'Yes' : 'No'}
          </Card.Text>
          <Card.Text>
            <strong>Contract Length (Months):</strong> {userData.user.plan.contractLengthMonths}
          </Card.Text>
          <Card.Text>
            <strong>Monthly Cost:</strong> ₹{userData.user.plan.monthlyCost}
          </Card.Text>
          <Card.Text>
            <strong>Additional Fees:</strong> ₹{userData.user.plan.additionalFees}
          </Card.Text>
          <Card.Text>
            <strong>Data Speed:</strong> {userData.user.plan.dataSpeed}
          </Card.Text>
          <Card.Text>
            <strong>Network Coverage:</strong> {userData.user.plan.networkCoverage}
          </Card.Text>
          <Card.Text>
            <strong>Family Plan Options:</strong> {userData.user.plan.familyPlanOptions ? 'Yes' : 'No'}
          </Card.Text>
          <Card.Text>
            <strong>Device Subsidies:</strong> {userData.user.plan.deviceSubsidies ? 'Yes' : 'No'}
          </Card.Text>
          <Card.Text>
            <strong>Streaming Services:</strong> {userData.user.plan.streamingServices}
          </Card.Text>
          <Card.Text>
            <strong>Usage Alerts:</strong> {userData.user.plan.usageAlerts ? 'Yes' : 'No'}
          </Card.Text>
          <Card.Text>
            <strong>Early Termination Terms:</strong> {userData.user.plan.earlyTerminationTerms}
          </Card.Text>
          <Card.Text>
            <strong>Discounts:</strong> ₹{userData.user.plan.discounts}
          </Card.Text>
          <Card.Text>
            <strong>Customer Support:</strong> {userData.user.plan.customerSupport}
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

export default PlanPage;