import React from 'react';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PlanPage from './components/PlanPage';
import UsagePage from './components/UsagePage';
import UsageAnalysisChartsPage from './components/UsageAnalysisChartsPage';
import UpdatePlanPage from './components/UpdatePlanPage';
import PlanRecommendationPage from './components/PlanRecommendationPage';
import LogoutPage from './components/LogoutPage';

const App = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  
  console.log("Authentication:"+isAuthenticated);
  console.log("User Data:"+JSON.stringify(userData));

  return (
    <Router>
    <Routes>
      <Route path="/" element={<WelcomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/logout" element={<LogoutPage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/plan" element={<PlanPage/>} />
      <Route path="/usage" element={<UsagePage/>} />
      <Route path="/usage-analysis" element={<UsageAnalysisChartsPage/>} />
      <Route path="/recommendation" element={<PlanRecommendationPage/>} />
      <Route path="/update-plan" element={<UpdatePlanPage/>} />
    </Routes>   
  </Router> 
  );
};


export default App;