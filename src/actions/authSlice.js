import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, updatePlanApi } from '../services/api';

// Create an async thunk for the login operation
export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const userData = await loginApi(email, password);
    return userData;
  } catch (error) {
    // Return an error with rejectWithValue
    return rejectWithValue(error.response.data);
  }
});

// Create an async thunk for updating the user's plan
export const updatePlanAsync = createAsyncThunk('auth/updatePlan', async ({ email, planId }) => {
  try {
    const updatedPlan = await updatePlanApi(email, planId);
    return updatedPlan;
  } catch (error) {
    // Handle errors as needed
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error details returned by rejectWithValue
      })
      .addCase(updatePlanAsync.fulfilled, (state, action) => {
        // Update the user's plan in the Redux store
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
