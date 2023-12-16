import React from 'react';
import { useSelector } from 'react-redux';
import withDataFetching from '../hocs/withDataFetching';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const UsagePage = ({ data, loading, error }) => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);

  console.log("Data:"+JSON.stringify(data));


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const telecomData = data.telecomPlanUsage;

  return (
    <div>
      {isAuthenticated ? (
      <Container className="p-3">
        <img src='images/expense-image.png' width={300} height={200}/>
        <h1 className="header">Expense Management Application</h1>
        <br/>
        <h4 className="mb-4">Telecom Plan Usage for {userData.user.name}</h4>
        
        <Card style={{ width: '64rem' }}>
          <Card.Body>
            <Card.Link><Link to="/home">Home</Link></Card.Link>
            <Card.Link><Link to="/logout">LogOut</Link></Card.Link>
        </Card.Body>
        </Card>

        <br/><br/>

      <div>
        <Table striped bordered hover>
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Data Used</th>
              <th>Minutes Used</th>
              <th>Text Messages Sent</th>
            </tr>
          </thead>
          <tbody>
            {telecomData.map((usage, index) => (
              <tr key={index}>
                <td>{usage.date}</td>
                <td>{usage.dataUsed}</td>
                <td>{usage.minutesUsed}</td>
                <td>{usage.textMessagesSent}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </Container> ) : (
        <p>Please Login First</p>
      )}
    </div>
  );
};

const apiUrl = 'http://localhost:9010/get-user-plan-usage?email='+sessionStorage.getItem('email');
export default withDataFetching(apiUrl)(UsagePage);
