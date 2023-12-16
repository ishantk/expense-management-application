import React from 'react';
import { useSelector } from 'react-redux';
import withDataFetching from '../hocs/withDataFetching';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // For Chart Category

const UsageAnalysisChartsPage = ({ data, loading, error }) => {

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
  const labels = Array.isArray(telecomData) && telecomData.length > 0
  ? telecomData.map((usage) => usage.date)
  : [];

const dataUsedList = telecomData.map((usage) => usage.dataUsed);
const minutesUsedList = telecomData.map((usage) => usage.minutesUsed);
const textMessagesSentList = telecomData.map((usage) => usage.textMessagesSent);

const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'Data Used',
      data: [...dataUsedList], // Convert to a list
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
    },
    {
      label: 'Minutes Used',
      data: [...minutesUsedList], // Convert to a list
      fill: false,
      borderColor: '#742774',
      borderWidth: 2,
    },
    {
      label: 'Text Messages Sent',
      data: [...textMessagesSentList], // Convert to a list
      fill: false,
      borderColor: 'rgba(255, 205, 86, 1)',
      borderWidth: 2,
    },
  ],
};

  return (
    <div>
      {isAuthenticated ? (
      <Container className="p-3">
        <img src='images/expense-image.png' width={300} height={200}/>
        <h1 className="header">Expense Management Application</h1>
        <br/>
        <h4 className="mb-4">Telecom Plan Usage</h4>
        <h4 className="mb-4">Analysis Chart For {userData.user.name}</h4>
        <Card style={{ width: '64rem' }}>
          <Card.Body>
            <Card.Link><Link to="/home">Home</Link></Card.Link>
            <Card.Link><Link to="/logout">LogOut</Link></Card.Link>
        </Card.Body>
        </Card>
        <div>
          <Line data={chartData} />
        </div> 

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
export default withDataFetching(apiUrl)(UsageAnalysisChartsPage);
