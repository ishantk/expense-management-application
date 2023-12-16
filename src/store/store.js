import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // Additional middleware or options if needed
});

export default store;
