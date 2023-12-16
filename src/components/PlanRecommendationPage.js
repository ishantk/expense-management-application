import React, { useState, useEffect, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PlanRecommendationPage = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);

  console.log("isAuthenticated:"+isAuthenticated);
  console.log("userData:"+userData);

  // State to hold user preferences
  const [userPreferences, setUserPreferences] = useState({
    dataAllowance: 20,
    minutes: 500,
    textMessages: 200,
    internationalRoaming: true,
    contractLengthMonths: 24,
    monthlyCost: 0,
  });

  // State to hold plans data
  const [plansData, setPlansData] = useState({ telecomPlans: [] });

  useEffect(() => {
    // Fetch plans data from the API endpoint
    const fetchPlansData = async () => {
      try {
        const response = await fetch('http://localhost:9010/get-plans');
        const data = await response.json();
        console.log("Plans Data:"+JSON.stringify(data));
        setPlansData(data);
      } catch (error) {
        console.error('Error fetching plans data:', error);
      }
    };

    // Call the fetch function
    fetchPlansData();
  }, []);

  // Function to recommend a plan based on user preferences
  const recommendPlan = useMemo(() => {
    return () => {
      const { dataAllowance, minutes, textMessages, internationalRoaming, contractLengthMonths, monthlyCost } = userPreferences;

      // Filter plans based on user preferences
      const filteredPlans = plansData.telecomPlans.filter((plan) => {
        return (
          plan.dataAllowanceGB >= dataAllowance &&
          plan.minutes >= minutes &&
          plan.textMessages >= textMessages
        );
      });

      // Sort the filtered plans by a scoring system
      const sortedPlans = filteredPlans.sort((a, b) => {
        // Calculate a score for each plan based on how well it matches the preferences
        const scoreA = calculatePlanScore(a);
        const scoreB = calculatePlanScore(b);

        // Sort in descending order of score
        return scoreB - scoreA;
      });

      console.log("sortedPlans:" + JSON.stringify(sortedPlans));

      // Return the recommended plan (the one with the highest score)
      return sortedPlans.length > 0 ? sortedPlans[0] : null;
    };
  }, [userPreferences, plansData]);

  // Function to calculate a score for a plan based on how well it matches the preferences
  const calculatePlanScore = (plan) => {
    const { dataAllowance, minutes, textMessages, internationalRoaming, contractLengthMonths, monthlyCost } = userPreferences;

    // You can adjust the weights based on the importance of each factor
    const weightDataAllowance = 2;
    const weightMinutes = 1.5;
    const weightTextMessages = 1.2;
    const weightInternationalRoaming = 1.5;
    const weightContractLengthMonths = 1;
    const weightMonthlyCost = 2;

    // Calculate the score for the plan
    const score =
      weightDataAllowance * (plan.dataAllowanceGB / dataAllowance) +
      weightMinutes * (plan.minutes / minutes) +
      weightTextMessages * (plan.textMessages / textMessages) +
      weightInternationalRoaming * (plan.internationalRoaming === internationalRoaming ? 1 : 0) +
      weightContractLengthMonths * (contractLengthMonths / plan.contractLengthMonths) +
      weightMonthlyCost * (1 - plan.monthlyCost / monthlyCost);

    return score;
  };

  const recommendedPlan = recommendPlan();
  console.log("recommendedPlan: "+recommendedPlan);
  return (
    <div>
      {recommendedPlan ? (
         <Container className="p-3">
         <img src='images/expense-image.png' width={300} height={200}/>
         <h1 className="header">Expense Management Application</h1>
         <h2>Plan Recommendation</h2>
         <br/>
         <h4>Hello, {userData.user.name}!</h4>
         <Card style={{ width: '64rem' }}>
           <Card.Body>
           <Card.Link><Link to="/home">Home</Link></Card.Link>
           <Card.Link><Link to="/logout">LogOut</Link></Card.Link>
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
           <h4>We recommend the following plan for you:</h4>
           <br></br>
           <Card.Title>Recommend Plan Details</Card.Title>
           <Card.Text>
            <strong>Plan Name:</strong> {recommendedPlan.planName}
          </Card.Text>
          <Card.Text>
            <strong>Data Allowance:</strong> {recommendedPlan.dataAllowanceGB}
          </Card.Text>
          <Card.Text>
            <strong>Minutes: </strong> {recommendedPlan.minutes}
          </Card.Text>
          <Card.Text>
            <strong>Text Messages: </strong> {recommendedPlan.textMessages}
          </Card.Text>
          <Card.Text>
            <strong>International Roaming: </strong> {recommendedPlan.internationalRoaming ? 'Yes' : 'No'}
          </Card.Text>
          <Card.Text>
            <strong>Monthly Cost:</strong> ₹{recommendedPlan.monthlyCost}
          </Card.Text>
          </Card.Body>
      </Card>
        </Container>
      ) : (
        <p>No plans match your preferences. Please adjust your preferences and try again.</p>
      )}
    </div>
  );
};

export default PlanRecommendationPage;
