import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../actions/authSlice'; 

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers if needed
});

export default rootReducer;
