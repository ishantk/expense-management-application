import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9010', // API base URL
  timeout: 5000, // Reasonable timeout
});

export const loginApi = async (email, password) => {
  try {
    const response = await instance.post('/login', { email, password });
    return response.data; // Assuming the API returns user data upon successful login
  } catch (error) {
    throw error; // Handle errors appropriately in your application
  }
};

export const updatePlanApi = async (email, planId) => {
  try {
    const response = await instance.post('/update-user-plan', { email, planId });
    return response.data; // Assuming the API returns user data upon successful update
  } catch (error) {
    throw error; // Handle errors appropriately in your application
  }
};
