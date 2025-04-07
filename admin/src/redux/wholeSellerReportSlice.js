import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const wholeSellerReportSlice = createSlice({
  name: "wholeSellerReport",
  initialState,
  reducers: {
    setWholeSellerReport: (state, action) => {
      state.data = action.payload.data;  
      state.columns = action.payload.columns || state.columns;  
    },
  },
});

export const { setWholeSellerReport } = wholeSellerReportSlice.actions;

export default wholeSellerReportSlice.reducer;
