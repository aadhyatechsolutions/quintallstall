import { createSlice } from '@reduxjs/toolkit';

// Initial state for platform price
const initialState = {
  platformPrice: 500, // Default platform price
};

// Create slice for platform commission
const platformComissionSlice = createSlice({
  name: 'platformComission',
  initialState,
  reducers: {
    // Action to set the platform price
    setPlatformPrice: (state, action) => {
      state.platformPrice = action.payload; // Update the platform price in the state
    },
  },
});

// Export the actions
export const { setPlatformPrice } = platformComissionSlice.actions;

// Export the reducer to be used in the store
export default platformComissionSlice.reducer;
