import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  costPerKg: 0, 
  comissionPercentage: 0, 
};


const wageCostComissionSlice = createSlice({
  name: 'wageCostComission',
  initialState,
  reducers: {
    
    setWageCostComission: (state, action) => {
      state.costPerKg = action.payload.costPerKg;
      state.comissionPercentage = action.payload.comissionPercentage;
    },
  },
});


export const { setWageCostComission } = wageCostComissionSlice.actions;


export default wageCostComissionSlice.reducer;
