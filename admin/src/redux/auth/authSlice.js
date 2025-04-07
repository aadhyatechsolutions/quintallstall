import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';

// Helper functions
const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  loading: false,
  error: null,
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.isInitialized = true;
    },
    login: (state, action) => {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // You can handle async actions here with createAsyncThunk
  },
});

// Action creators
export const { login, logout, init, setLoading, setError } = authSlice.actions;

// Async thunk for login
export const loginAsync = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
    const { accessToken, user } = data;
    setSession(accessToken);
    dispatch(login({ user }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Async thunk for registration
export const registerAsync = (formData, profileImage) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const requestData = new FormData();
    requestData.append('formData', JSON.stringify(formData));
    requestData.append('profileImage', profileImage);
    const { data } = await axiosInstance.post("/auth/register", requestData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const { accessToken, user } = data;
    setSession(accessToken);
    dispatch(login({ user }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Check if token is valid
export const isValidToken = (accessToken) => {
  if (!accessToken) return false;

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken?.sub && decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Initialize authentication state
export const initializeAuth = () => async (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && isValidToken(accessToken)) {
    setSession(accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await axiosInstance.get("/auth/profile");
    const { user } = response.data;
    dispatch(init({ isAuthenticated: true, user }));
  } else {
    dispatch(init({ isAuthenticated: false, user: null }));
  }
};

// Export reducer
export default authSlice.reducer;
