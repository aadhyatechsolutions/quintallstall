import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  data: [],
};

const reviewListSlice = createSlice({
  name: "reviewList",
  initialState,
  reducers: {
    setReviewList: (state, action) => {
      state.data = action.payload.data; 
      state.columns = action.payload.columns || state.columns; 
    },
  },
});

export const { setReviewList } = reviewListSlice.actions;

export default reviewListSlice.reducer;
