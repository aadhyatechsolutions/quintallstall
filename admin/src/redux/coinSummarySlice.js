import { createSlice } from "@reduxjs/toolkit";

// Initial state for coin summary
const initialState = {
  columns: [],
  data: [],
};

const coinSummarySlice = createSlice({
  name: "coinSummary",
  initialState,
  reducers: {
    setCoinSummary: (state, action) => {
      state.data = action.payload.data;
      state.columns = action.payload.columns;
    },
    updateCoinSummaryStatus:(state, action) => {
        const { srNo, status } = action.payload;
        const index = state.data.findIndex(item => item.srNo === srNo);
        if (index !== -1) {
          state.data[index].status = status;
        }
      },
  },
});

export const { setCoinSummary, addCoinSummary, deleteCoinSummary, editCoinSummary,updateCoinSummaryStatus } =
  coinSummarySlice.actions;

export default coinSummarySlice.reducer;
